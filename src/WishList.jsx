import React, { useEffect, useState } from 'react';
import WishCard from './Component/WishCard/WishCard';

export default function WishList() 
{
  const [isLoading, setLoading] = useState(true);
  const [addedWishList, setWishList] = useState([]);
  useEffect(() => 
  {
    fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/Wish-List.json')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const wishList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setWishList(wishList);
        } else {
          console.log('No favorites present.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
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
      {addedWishList.length === 0 ? (
        <h3>No favorites present.</h3>
      ) : (
        addedWishList.map((product, index) => (
          <WishCard
            key={index}
            id={product["Item-id"]}
            image={product['Product Address']}
            name={product['Product Name']}
            description={product['Product Description']}
            price={product['Product Price']}
          />
        ))
      )}
    </main>
  );
}
