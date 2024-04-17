import React, { useState, useEffect } from 'react';
import '../Checkout/Checkout.css';

export default function Checkout() {
    const [amount, setAmount] = useState(0);

    function scrollToFivePercent() {
        const scrollPosition = (document.documentElement.scrollHeight - window.innerHeight) * 0.2;

        document.documentElement.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }

    scrollToFivePercent();

    const proceedPayment = () => {
        const price_value = document.getElementById('prd-price').innerHTML;
        const numberOnly = parseFloat(price_value.replace('$', ''));
        setAmount(numberOnly);
    };

    useEffect(() => {
        if (amount !== 0) {
            alert(amount);
        }
    }, [amount]);

    // const call_payment = () =>
    // {
    //     var options = 
    //     {
    //         key : "",
    //         key_secret : "",
    //         amount : amount * 100,
    //         currency : "INR",
    //         name : "Sample Project",
    //         description : "Firebase connectivity",
    //         handler : function(response)
    //         {
    //             alert(response.razorpay_payment_id);
    //         },
    //         prefill:
    //         {
    //             name : "Mohan",
    //             email : "connectwithmnk@gmail.com",
    //             contact : "8870164172"
    //         },
    //         notes :
    //         {
    //             address : "Razor pay connectivity"
    //         },
    //         theme :
    //         {
    //             color : "#3399cc"
    //         }
    //     }
    //     var pay = new window.Razorpay(options);
    //     pay.open();
    // }
    return (
        <>
            <main id='checkout-container'>
                <section id='product-details'>
                    <div className='product-img'>
                        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                    </div>
                    <div className='product-details'>
                        <span className='desc-content'>
                            <h1 id='prd-name'>
                                Laser Light
                            </h1>
                            <h3 id='prd-price'>
                                $35.04
                            </h3>
                            <p id='prd-desc'>
                                Hanging lights can add a stylish and elegant touch to any room, creating a warm and inviting atmosphere. They come in a variety of designs and sizes, making it easy to find the perfect fit for your space.
                            </p>
                        </span>
                    </div>
                </section>
                <section id='payment-details'>
                    <button id='proceed-payment' onClick={proceedPayment}>
                        PROCEED TO PAYMENT
                    </button>
                </section>
            </main>
        </>
    );
}
