import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Order/OrderCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as ThumpsUp } from '@fortawesome/free-regular-svg-icons'
export default function OrderCard(props) {
    const navigate = useNavigate();
    const addFeedBack = () =>
    {
        navigate("/product-feedback", {
            state: {
                image: props.image,
                name: props.name,
            }
        });
    }
  return (
    <>
        <main id='order-card-container'>
            <div id='img-sec'>
                <img src={props.image} alt="" />
            </div>
            <div id='desc-sec'>
                <h1>
                    {props.name}
                </h1>
                <h2>
                    Order Value : {props.price}
                </h2>
                
                <button id='continue-shopping' onClick={()=>{navigate("/products")}}>CONTINUE SHOPPING</button>
            </div>
            <div id='corner-card'>
                <FontAwesomeIcon icon={ThumpsUp} id='thumps-up' onClick={addFeedBack}/>
            </div>
        </main>
    </>
  )
}
