const express = require("express");
const Stripe = require("stripe");
let Order = require("../models/order.model");

const stripe = Stripe("sk_test_51MtTYpDYzW29slWj2nMgouPYGldGs0EoN3TSw89GQ8j3WtR7pc0iltVZLXnFhLcZ5orG7y69uwnWpwDfGPiMYCRT00JgBiwoW2");

const router = express.Router()

// COLLECT INFO ON PAYMENT
router.post("/create-checkout-session", async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.customerEmail,
            // cart: JSON.stringify(req.body.cartItems)
        }
    });

    const line_items = req.body.cartItems.map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.itemName,
                    description: item.details,
                    metadata: {
                        id: item._id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 0, currency: 'usd' },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 5 },
                        maximum: { unit: 'business_day', value: 7 },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 1500, currency: 'usd' },
                    display_name: 'Next day air',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 1 },
                        maximum: { unit: 'business_day', value: 1 },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true
        },
        line_items,
        customer: customer.id,
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout-success',
        cancel_url: 'http://localhost:3000/',
    });

    res.send({ url: session.url });
})

// CREATE ORDER
const createOrder = async (customer, data, lineItems) => {

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: lineItems.data,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("Processed order: ", savedOrder)
    } catch (err) {
        console.log(err);
    }
}


let endpointSecret;

// endpointSecret = "whsec_be43be9c5061b15d58ebfa8d35328f8306d5955350a99fb7f11819fdbb9206a3";

// COMPLETE PAYMENT AND RECORD IT IN THE DATABASE
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let data;
    let eventType;

    if (endpointSecret) {

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("verified");
        } catch (err) {
            console.log("failed");
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    // HANDLE THE EVENT
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then(customer => {
            stripe.checkout.sessions.listLineItems(
                data.id,
                {},
                function (err, lineItems) {
                    console.log("line_items: ", lineItems)
                    createOrder(customer, data, lineItems);
                }
            );
        }).catch(err => console.log(err.message));
    }

    // RETURN A 200 RESPONSE TO ACKNOWLEDGE RECEIPT OF THE EVENT
    res.send().end;
});

module.exports = router;
