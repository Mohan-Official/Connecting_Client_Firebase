import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; 
import OrderCard from './Component/Order/OrderCard';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

export default function OrderSummary() {
    const navigate = useNavigate();
    const [leftPosition, setLeftPosition] = useState('0');
    const [isLoading, setLoading] = useState(true);
    const [addedWishList, setWishList] = useState([]);
    const [userType, setUserType] = useState('Customer');
    const [isLoginFormVisible, setLoginFormVisible] = useState(false);

    const toggleDiv = () => {
        const newPosition = leftPosition === '0' ? '50%' : '0';
        setLeftPosition(newPosition);

        if (newPosition === '0') {
            setUserType('Customer');
        } else {
            setUserType('true');
            setLoginFormVisible(true);
        }
    };

    const firebaseConfig = {
        apiKey: "AIzaSyCvpT1ZqR4hpYISR76i8sGIsw1LUHs7sUk",
        authDomain: "shop-list-19c4c.firebaseapp.com",
        databaseURL: "https://shop-list-19c4c-default-rtdb.firebaseio.com",
        projectId: "shop-list-19c4c",
        storageBucket: "shop-list-19c4c.appspot.com",
        messagingSenderId: "213979626732",
        appId: "1:213979626732:web:9fb2660419ef16a24af9c9",
        measurementId: "G-QG38MBF334"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);
    const auth = getAuth();

    const checkAdminUser = (e) => {
        e.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // const passText = document.getElementById('pass-text').value;
        // const emailText = document.getElementById('email-text').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const dt = new Date();
                update(ref(database, 'users/' + user.uid), {
                    Last_Login: dt,
                })
                alert("User Verified");
                setUserType("Admin");
            setLoginFormVisible(false);
            localStorage.setItem("admin","success");
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    if(localStorage.getItem("admin")==="success")
    {
        navigate('/admin-page')
    }
    if(localStorage.getItem("admin")==="failure")
    {
        navigate('/order-summary')
    }

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
                console.log('No orders present.');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
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

    const CallBack = () =>
    {
        setUserType("Customer");
        setLeftPosition('0%');
    }
    if (userType === "true" && isLoginFormVisible) 
    {
        return (
            <>
                <button id="cancel-login-admin" onClick={CallBack}>BACK</button>
                <section id='login-status'>
                <h4 id='login-status-type'>
                    You logged in as {userType === "Customer" || userType === "Admin" ? userType : "Guest"}
                </h4>

                    <div className='corner left'></div>
                    <div className='corner right'></div>
                </section>
                <main id='login-form'>
                    <h2>
                        LOGIN PAGE
                    </h2>
                    <form action="" id='form-component' onSubmit={checkAdminUser}>
                        <span>
                            <input type="email" name="" id="username" required/>
                            <label>USERNAME</label>
                        </span>
                        <span>
                            <input type="password" name="" id="password" required/>
                            <label>PASSWORD</label>
                        </span>
                        <button id='login-btn'>LOGIN</button>
                        
                        <Link to="/register" className='new-register'>Register New Admin</Link>
                    </form>
                </main>
            </>
        );
    }

    return (
        <>
            <section id='login-status'>
                <h4>
                    You logged in as {userType}
                </h4>
                <div className='corner left'></div>
                <div className='corner right'></div>
            </section>
            <section>
                <div id='button-div'>
                    <div id='admin' onClick={toggleDiv} className={leftPosition === '50%' ? 'active' : ''}>
                        ADMIN
                    </div>
                    <div id='customer' onClick={toggleDiv} className={leftPosition === '0' ? 'active' : ''} >
                        CUSTOMER
                    </div>
                    <div id='hover-div' style={{ left: leftPosition }}></div>
                </div>
            </section>
            <h1 className='previous-orders'>
                PREVIOUS ORDERS
            </h1>
            <main id='order-summary-container'>
                {addedWishList.length === 0 ? (
                    <h3>No orders placed.</h3>
                ) : (
                    addedWishList.map((product) => (
                        <OrderCard
                            key={product.id}
                            id={product['Order Id']}
                            image={product['Order image']}
                            name={product['Order Name']}
                            description={product['Product Description']}
                            price={product['Order Price']}
                        />
                    ))
                )}
            </main>
        </>
    );
}
