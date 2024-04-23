import React, { useEffect, useState } from 'react';
import '../Admin/Admin.css';
import { useNavigate } from 'react-router-dom';
import Barchart from '../../Barchart/Barchart';
import ProductBar from '../../Barchart/ProductBar';

const AdmitCard = (props) => {
  const paymentId = props.paymentId;
  
  const MoveRazorPay = () => {
    const isConfirmed = window.confirm('Are you sure you want to check the payment status?');
  
    if (isConfirmed) {
      window.open(`https://dashboard.razorpay.com/app/payments/${paymentId}`, '_blank');
    }
  };

  return (
    <>
      <section id='admin-card'>
        <div id='pic-div'>
          <img src={props.image} alt="Order Product" className='pic'/>
        </div>
        <div id='pay-details'>
          <h2>Product Name: {props.name}</h2>
          <h3>Payment-Id: {props.paymentId}</h3>
          <label>Transaction Time: {props.time}</label>
          <label>Transaction Date: {props.date}</label>
          <button onClick={MoveRazorPay}>Payment Dashboard</button>
        </div>
      </section>
    </>
  );
};

export default function Admin() {
  const [isLoading, setLoading] = useState(true);
  const [addedWishList, setWishList] = useState([]);
  const [showBarchart, setShowBarchart] = useState(true);  // State to toggle between barcharts
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/OrderDetails.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
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

  if (isLoading) {
    return (
      <section>
        <h3>Loading data....</h3>
      </section>
    );
  }

  const handleLogout = () => {
    localStorage.setItem("admin", "failure");
    navigate('/order-summary');
  };

  const summaries = addedWishList.reduce((acc, product) => {
    const orderDate = product['Order Date'];
    const orderPrice = parseFloat(product['Order Price']);

    if (acc[orderDate]) {
      acc[orderDate] += orderPrice; // Add the price to existing date
    } else {
      acc[orderDate] = orderPrice; // Initialize the price for the new date
    }

    return acc;
  }, {});

  const orderNameCount = addedWishList.reduce((acc, product) => 
  {
      const orderName = product['Order Name'];
      
      // Check if the orderName already exists in the accumulator
      const existingOrder = acc.find(item => item.name === orderName);
    
      if (existingOrder) {
        existingOrder.count += 1;
      } else {
        acc.push({ name: orderName, count: 1 });
      }
    
      return acc;
    }, []);

  const toggleBarchart = () => {
    setShowBarchart(prevState => !prevState);  // Toggle the state
  };

  return (
    <>
      <button id='logout-btn' onClick={handleLogout}>
        LOGOUT
      </button>
      <h1>
        Admin Page
      </h1>

      <button id='bar-btn' onClick={toggleBarchart}>
        {showBarchart ? 'Product Barchart' : 'Price Barchart'}
      </button>

      {
        showBarchart ? (
          <section id='prdct-barchart'>
            <ProductBar orderNameCount={orderNameCount} />
          </section>
        ) : (
          <section id='barchart'>
            <Barchart summaries={summaries} />
          </section>
        )
      }
      
      <main id='admin-container'>
        {addedWishList.length === 0 ? (
          <h3>No favorites present.</h3>
        ) : (
          addedWishList.map((product, index) => (
            <AdmitCard key={index} paymentId={product['Payment Id']} image={product['Order image']} time={product['Order Day']} date={product['Order Date']} price={product['Order Price']} name={product['Order Name']} />
          ))
        )}
      </main>
    </>
  );
}
