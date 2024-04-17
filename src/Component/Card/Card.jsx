import React, { useState, useEffect } from 'react';
import '../Card/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as lightHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

export default function Card(props) {
  const [WishList, setWishList] = useState(false);
  const [iconValue, setIconValue] = useState("lightHeart");

  useEffect(() => {
    // Fetch wishlist data from Firebase
    fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/Wish-List.json')
      .then(response => response.json())
      .then(wishListItems => {
        const isWishListed = Object.values(wishListItems).some(
          item => item["Item-id"] === props.id
        );
        setWishList(isWishListed);
        setIconValue(isWishListed ? "solidHeart" : "lightHeart");
      });
  }, [props.id]);
  const data = {
    "Item-id": props.id,
    "Product Address": props.image,
    "Product Name": props.name,
    "Product Description": props.description,
    "Product Price": props.price
  };

  const passData = async () => 
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
  

  const addWishList = () => {
    if (!WishList) {
      fetch(
        'https://shop-list-19c4c-default-rtdb.firebaseio.com/Wish-List.json',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } 
    else {
      fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/Wish-List.json')
        .then(response => response.json())
        .then(wishListItems => {
          const itemIdToDelete = Object.keys(wishListItems).find(
            key => wishListItems[key]["Item-id"] === props.id
          );

          if (itemIdToDelete) {
            fetch(
              `https://shop-list-19c4c-default-rtdb.firebaseio.com/Wish-List/${itemIdToDelete}.json`,
              {
                method: 'DELETE'
              }
            );
          }
        });
    }
  };

  const toggleState = () => {
    setWishList(!WishList);
    setIconValue(WishList ? "lightHeart" : "solidHeart");
    addWishList();
  };

  return (
    <>
      <div id='card'>
        <main id='card-container'>
          <section className='image-section'>
            <FontAwesomeIcon
              icon={iconValue === "solidHeart" ? solidHeart : lightHeart}
              id='heart-icon'
              style={{ color: iconValue === "solidHeart" ? '#242424' : 'black' }}
              onClick={toggleState}
            />
            <img className='product-image' src={props.image} alt="Product Image" />
          </section>
          <section className='addCart-section' onClick={passData}>
            <FontAwesomeIcon icon={faPlus} id='plus-icon' />
            <h2>ADD TO CART</h2>
          </section>
        </main>
        <section className='description-section'>
            <label>{props.name}</label>
            <p>{props.price}</p>
        </section>
      </div>
    </>
  );
}
