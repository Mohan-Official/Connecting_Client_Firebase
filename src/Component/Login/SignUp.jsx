// import React,{useState} from 'react';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
// import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// import { useNavigate } from 'react-router-dom';


// export default function Login() {
//     const [showLogin, setShowLogin] = useState(false);
//     const navigate = useNavigate();
//     const firebaseConfig = {
//         apiKey: "AIzaSyCvpT1ZqR4hpYISR76i8sGIsw1LUHs7sUk",
//         authDomain: "shop-list-19c4c.firebaseapp.com",
//         databaseURL: "https://shop-list-19c4c-default-rtdb.firebaseio.com",
//         projectId: "shop-list-19c4c",
//         storageBucket: "shop-list-19c4c.appspot.com",
//         messagingSenderId: "213979626732",
//         appId: "1:213979626732:web:9fb2660419ef16a24af9c9",
//         measurementId: "G-QG38MBF334"
//     };

//     const app = initializeApp(firebaseConfig);
//     const analytics = getAnalytics(app);
//     const database = getDatabase(app);
//     const auth = getAuth();

//     const handleClick = (e) => {
//         e.preventDefault(); // Prevent form submission
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const email = document.getElementById('email').value;

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Signed up 
//                 const user = userCredential.user;
//                 // ...
//                 set(ref(database, 'users/'+user.id),{
//                     username : username,
//                     email:email
//                 })
//                 alert("User created");
//                 // navigate("/admin-page")
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//                 alert(errorMessage);
//             });
//     }
//     const checkUser = () => {
//         const passText = document.getElementById('pass-text').value;
//         const emailText = document.getElementById('email-text').value;

//         signInWithEmailAndPassword(auth, emailText, passText)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 const dt = new Date();
//                 update(ref(database, 'users/' + user.uid), {
//                     Last_Login: dt,
//                 })
//                 alert("User Verified");
//                 navigate("/admin-page");
//             })
//             .catch((error) => {
//                 const errorMessage = error.message;
//                 alert(errorMessage);
//             });
//     }

//     const toggleLogin = () => {
//         setShowLogin(!showLogin);
//     }
//     return (
//         <>
//         <h1>Login Page</h1>
//         <button onClick={toggleLogin}>{showLogin ? "Signup" : "Login"}</button>

//         {showLogin ? (
//             <>
//                 <h1>Signup Form</h1>
//                 <form onSubmit={handleClick}>
//                     <input type="text" placeholder='username' id="username" />
//                     <input type="email" placeholder='email' id="email" />
//                     <input type="password" placeholder='password' id="password" />
//                     <button type="submit">Submit</button>
//                 </form>
//             </>
//         ) : (
//             <>
//                 <h1>Login Form</h1>
//                 <form onSubmit={checkUser}>
//                     <input type="email" placeholder='email' id="email-text" />
//                     <input type="password" placeholder='password' id="pass-text" />
//                     <button type="button" onClick={checkUser}>Login</button>
//                 </form>
//             </>
//         )}
//     </>
//     )
// }

import React, {useEffect} from 'react'

export default function SignUp() {
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch OrderDetails
            const orderResponse = await fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/OrderDetails.json');
            const orderData = await orderResponse.json();
    
            // Fetch cart-items
            const cartResponse = await fetch('https://shop-list-19c4c-default-rtdb.firebaseio.com/cart-items.json');
            const cartData = await cartResponse.json();
    
            // Compare product-id and item-id
            for (const orderId in orderData) {
              const order = orderData[orderId];
              for (const itemId in cartData) {
                const item = cartData[itemId];
                if (order['Product Id'] === item['Item-id']) {
                  alert(`Matching item-id: ${item['Item-id']}`);
                }
              }
            }
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    
      }, []);
    
  return (
    <div>
      
    </div>
  )
}
