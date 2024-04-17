import React from 'react';
import "../WishCard/WishCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping as cart} from '@fortawesome/free-solid-svg-icons'

export default function WishCard(props) 
{
    const data = {
        "Item-id": props.id,
        "Product Address": props.image,
        "Product Name": props.name,
        "Product Description": props.description,
        "Product Price": props.price
      };

    const addToCart = async () =>
    {
        try 
        {
        const response = await fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/cart-items.json');
        const cartItems = await response.json();
    
        //Checking if the item already exists in the cart or not....
        const isItemInCart = Object.values(cartItems || {}).some(
            item => item["Item-id"] === props.id
        );
    
        //If item is not in cart, add it to the cart....
        if (!isItemInCart) {
            await fetch(
            'https://shop-list-19c4c-default-rtdb.firebaseio.com/cart-items.json',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            }
            );
        }
        } catch (error) {
        console.error("Error adding item to cart:", error);
        }
    };
    return (
        <>
            <main id='wish-card'>
                <FontAwesomeIcon icon={cart} id='cart-icon' onClick={addToCart}/>
                <section className='wish-card-one'>
                    <img src={props.image} alt="" />
                </section>
                <section className='wish-card-two'>
                    <h1>
                        {props.name}
                    </h1>
                    <h3>
                        {props.price}
                    </h3>
                    <p>
                        {props.description}
                    </p>
                </section >
            </main>
        </>
    );
}
