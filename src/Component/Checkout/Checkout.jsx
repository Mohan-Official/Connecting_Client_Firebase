import React, { useState, useEffect } from 'react';
import '../Checkout/Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark as Cross } from '@fortawesome/free-solid-svg-icons';

export default function Checkout() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [date , setDate] = useState('');
    const [Time , setTime] = useState('');
    const [OrderCount , setOrderCount] = useState(0);
    const location = useLocation();
    const { state } = location;
    const { id, image, name, price, description, prdtCount } = state || {};

    function scrollToFivePercent() {
        const scrollPosition = (document.documentElement.scrollHeight - window.innerHeight) * 0.2;

        document.documentElement.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }

    scrollToFivePercent();

    const proceedPayment = () => {
        const price_value = document.getElementById('final-price').innerHTML;
        const numberOnly = parseFloat(price_value.replace('$', ''));
        // alert(typeof(numberOnly));
        setAmount(numberOnly);

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        setDate(formattedDate);
        setTime(formattedTime);
        setOrderCount(OrderCount + 1);
    };
    

    const calculateAmount = () =>
    {
        const count = parseInt(prdtCount, 10);
        const cost = parseFloat(price.replace('$', ''));
        return count * cost;
    }

    const handleBackToCart = () => {
        navigate(-1);
    };


    useEffect(() => {
        if (amount !== 0 && !isPaymentProcessing) {
            setIsPaymentProcessing(true);
            var options = {
                key: "rzp_test_xFs30Eoezdp1xo",
                key_secret: "I2ADd7h2tTPjAf8Fyipmnu99",
                amount: amount * 100,
                currency: "INR",
                name: "AVM MART",
                description: "Giving good product gives us Happiness!!",
                handler: function (response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_signature);
                    // localStorage.setItem('productName', name);
                    // localStorage.setItem('productPrice', price);
                    // localStorage.setItem('productDescription', description);
                    setPaymentSuccess(true); // Set payment success to true
                    storeOrderedPrdt(response.razorpay_payment_id,name,price,description)
                    // setTimeout(() => {
                    //     navigate("/cart");
                    // }, 5000);
                    const paymentMethod = response.method || 'Unknown';

                    console.log(paymentMethod);
                },
                prefill: {
                    name: "Mohan",
                    email: "connectwithmnk@gmail.com",
                    contact: "8870164172"
                },
                notes: {
                    address: "Razorpay Corporate office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    }, [amount, isPaymentProcessing]);

    const storeOrderedPrdt = (OrderId,OrdName,OrdPrice,OrdDescription) =>
    {
        const Orderdata = 
        {
            "Payment Id" : OrderId,
            "Product Id" : id,
            "Order Name" : OrdName,
            "Order Price" : OrdPrice,
            "Order Description" : OrdDescription,
            "Order Price" : amount,
            "Order image" : image,
            "Order Date" : date,
            "Order Day" : Time
        }
        fetch(
            'https://shop-list-19c4c-default-rtdb.firebaseio.com/OrderDetails.json',
            {
              method: 'POST',
              body: JSON.stringify(Orderdata),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
    }
    return (
        <>
            <button id='back-cart' onClick={handleBackToCart}>BACK TO CART</button>

            <main id='checkout-container' className={isPaymentProcessing ? 'disabled' : ''}>
                <section id='product-details'>
                    <div className='product-img'>
                        <img src={image} alt="" />
                    </div>
                    <div className='product-details'>
                        <h1 id='prd-name'>
                            {name}
                        </h1>
                        <h3 id='prd-price'>
                            {price}
                        </h3>
                        <p id='prd-desc'>
                            {description}
                        </p>
                        <h3 id='prd-desc'>
                            {prdtCount} x {price} = {calculateAmount()}
                        </h3>
                        <h3 id='prd-price'>
                            Payable amount : <b id='final-price'>{calculateAmount()}</b>
                        </h3>
                    </div>
                </section>
                <section id='payment-details'>
                    <button id='proceed-payment' onClick={proceedPayment} disabled={isPaymentProcessing}>
                        PROCEED TO PAYMENT
                    </button>
                </section>
            </main>

            {paymentSuccess && (
                <main id='success-container'>
                    <FontAwesomeIcon icon={Cross} id='cross-icon' onClick={()=>{navigate('/products')}}/>
                    <img src={image} alt="" />
                    <h3>ORDER PLACED SUCCESSFULLY</h3>
                </main>
            )}
        </>
    );
}
