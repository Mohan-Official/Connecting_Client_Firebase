import React, { useEffect, useState } from 'react';
import WishCard from './Component/WishCard/WishCard';

export default function WishList() {
  const [isLoading, setLoading] = useState(true);
  const [addedWishList, setWishList] = useState([]);

  useEffect(() => {
    fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/Wish-List.json')
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
        <h3>Loading data....</h3>
      </section>
    );
  }

  return (
    <main id='Wish-List-Container'>
      {addedWishList.map((product, index) => (
        <WishCard
          key={index}
          image={product['Product Address']}
          name={product['Product Name']}
          description={product['Product Description']}
          price={product['Product Price']}
        />
      ))}
    </main>
  );
}
