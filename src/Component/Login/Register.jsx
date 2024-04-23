import React from 'react'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Register.css'

export default function Register() {
    const navigate = useNavigate();
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

    const handleSignUp = (e) => {
        e.preventDefault(); 
        const username = document.getElementById('username-field').value;
        const password = document.getElementById('password-field').value;
        const email = document.getElementById('email-field').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    username: username,
                    email: email
                })
                alert("User created");
                navigate("/order-summary");
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <>
            <h1>Registration Form</h1>
            <form onSubmit={handleSignUp} id='register-form'>
                <span id='field-span'>
                    <input type="text" id="username-field" />
                    <label className='user-label'>USERNAME</label>
                </span>
                <span id='field-span' className='second-field-span'>
                    <input type="email" id="email-field" />
                    <label className='user-label'>EMAIL</label>
                </span>
                <span id='field-span' className='third-field-span'>
                    <input type="password" id="password-field" />
                    <label className='user-label'>PASSWORD</label>
                </span>
                <button type="submit" className='register-btn'>Sign Up</button>
                <Link to="/order-summary" id='link-user'>Already User</Link>
            </form>
        </>
    )
}
