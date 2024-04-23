import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CartCard/CartCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faAdd, faSubtract, faShare as Share } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter as Twitter, faWhatsapp as WhatsApp, faInstagram as Insta } from '@fortawesome/free-brands-svg-icons';

export default function CartCard(props) {
    let [productCount, setCount] = useState(1);
    let [count, setPrdtCount] = useState(0);
    const navigate = useNavigate();

    const increment = () => {
        const newCount = productCount + 1;
        setCount(newCount);
    };

    const decrement = () => {
        const newCount = productCount > 1 ? productCount - 1 : 1;
        setCount(newCount);
    };

    const proceedPayment = () => {
        setPrdtCount(productCount);
        // console.log('clicked');
        navigate("/checkout", {
            state: {
                image: props.image,
                id: props.id,
                name: props.name,
                price: props.price,
                description: props.description,
                prdtCount: productCount
            }
        });
        const value = props.id; // You can replace this with the actual value you want to pass
        props.onClick(value);
    };

    return (
        <>
            <main id='Per-Card-Row'>
                <section id='product-cart'>
                    <div className='prd-image-cart'>
                        <img src={props.image} alt="" />
                    </div>
                    <div className='prd-desc-cart'>
                        <h2>
                            {props.name}
                        </h2>
                        <h3>
                            {props.price}
                        </h3>
                        <p>
                            {props.description}
                        </p>
                    </div>
                </section>
                <section id='checkout-cart'>
                    <div id='order-section'>
                        <span className='counter-div'>
                            <input type="number" id='product-count' value={productCount} onChange={(e) => { setCount(e.target.value) }} readOnly />
                            <span className='buttons-div'>
                                <button>
                                    <FontAwesomeIcon icon={faAdd} onClick={increment} />
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faSubtract} onClick={decrement} />
                                </button>
                            </span>
                        </span>
                        <button id='checkOutBtn' onClick={proceedPayment}>
                            <FontAwesomeIcon icon={faShoppingCart} className='cart-icon' />
                            CHECK OUT
                        </button>
                    </div>
                    <div id='socialmedia-section'>
                        <FontAwesomeIcon icon={Twitter} className='social-icons twitter' />
                        <FontAwesomeIcon icon={WhatsApp} className='social-icons whatsapp' />
                        <FontAwesomeIcon icon={Insta} className='social-icons insta' />
                        <FontAwesomeIcon icon={Share} className='social-icons share' />
                    </div>
                </section>
            </main>
        </>
    );
}
