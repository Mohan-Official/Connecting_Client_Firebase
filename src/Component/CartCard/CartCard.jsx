import React,{ useState } from 'react'
import '../CartCard/CartCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart , faAdd , faSubtract ,faShare as Share } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter as Twitter , faWhatsapp as WhatsApp , faInstagram as Insta } from '@fortawesome/free-brands-svg-icons'
export default function CartCard(props) {
    let [productCount, setCount] = useState(1);
    const increment=()=>
    {
        productCount = productCount + 1;
        setCount(productCount);
    }
    const decrement=()=>
    {
        productCount = productCount > 1 ? productCount - 1 : 1;
        setCount(productCount);
    }
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
                        <input type="number" value={productCount} onChange={(e)=>{e.target.value}} readOnly/>
                        <span className='buttons-div'>
                            <button>
                                <FontAwesomeIcon icon={faAdd} onClick={increment} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faSubtract} onClick={decrement} />
                            </button>
                        </span>
                    </span>
                    <button id='checkOutBtn'>
                        <FontAwesomeIcon icon={faShoppingCart} className='cart-icon'/>
                        CHECK OUT
                    </button>
                </div>
                <div id='socialmedia-section'>
                    <FontAwesomeIcon icon={Twitter} className='social-icons twitter'/>
                    <FontAwesomeIcon icon={WhatsApp} className='social-icons whatsapp'/>
                    <FontAwesomeIcon icon={Insta} className='social-icons insta'/>
                    <FontAwesomeIcon icon={Share} className='social-icons share'/>
                </div>
            </section>
        </main>
    </>
  )
}
