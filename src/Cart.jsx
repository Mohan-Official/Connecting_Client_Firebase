import React,{ useEffect, useState } from 'react'
import CartCard from './Component/CartCard/CartCard';

export default function Cart() {
    const [isLoading, setLoading] = useState(true);
  const [addedWishList, setWishList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/cart-items.json')
      .then((response) => response.json())
      .then((data) => {
        const wishList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLoading(false);
        setWishList(wishList);
      });
  }, []);

  console.log(addedWishList);
  if (isLoading) {
    return (
      <section>
        <h3>No Products in the cart..</h3>
      </section>
    );
  }

  return (
    <main id='Cart-container'>
      {addedWishList.map((product, index) => (
        <CartCard
          key={index}
          id ={product['Item-id']}
          image={product['Product Address']}
          name={product['Product Name']}
          description={product['Product Description']}
          price={product['Product Price']}
        />
      ))}
    </main>
  )
}
