import React from 'react';
import "./myBasketModal.scss";

interface MyBasketModalProps {
    setIsMyBasketModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function MyBasketModal({ setIsMyBasketModal }: MyBasketModalProps) {

    return (
        <React.Fragment>
            <div className="my-basket-modal">
                <div className="my-basket-modal__content">
                    <div className="my-basket-modal__header">
                        <h2>Free shipping</h2>
                    </div>
                    <div className="my-basket-modal__text">
                        <p>
                            ee standard shipping (excluding items shipped by sellers)
                            Get a 3.00 ₼ credit (Standard Shipping) for late delivery.
                            Sellers offer free shipping when certain thresholds are met. Free shipping is usually available for orders over 50 ₼ from a single seller but may change from seller to seller.
                            Temu has order minimums to place your order. The applicable thresholds are detailed before you submit your order.
                        </p>
                    </div>
                    <div className="my-basket-modal__btn">
                        <button>OK</button>
                    </div>
                </div>
            </div>
            <div onClick={() => setIsMyBasketModal(false)} className="my-basket-modal__overlay my-basket-modal__overlay--active"></div>
        </React.Fragment>
    )
}
 
export default MyBasketModal;