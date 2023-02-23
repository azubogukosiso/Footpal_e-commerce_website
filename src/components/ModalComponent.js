import './component_styles/ModalComponent.css';

const ModalComponent = (props) => {
    return (
        <>
            <div className='backdrop' onClick={() => props.setIsOpen(false)} />
            <div className='cart-modal w-50 rounded bg-white shadow p-3 position-fixed'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Your Cart</h4>
                    <button className='btn btn-dark' onClick={() => props.setIsOpen(false)}>
                        Close
                    </button>
                </div>
                <div className='my-3 d-flex justify-content-center align-items-center'>
                    These are the items in your cart
                </div>
            </div>
        </>
    )
}

export default ModalComponent