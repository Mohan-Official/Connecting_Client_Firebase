import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Home'
import Navbar from './Component/Navbar'
import Products from './Products'
import WishList from './WishList'
import Footer from './Component/Footer/Footer'
import Cart from './Cart'
import Checkout from './Component/Checkout/Checkout'
import OrderSummary from './OrderSummary'
// import Login from './Component/Barchart/Barchart'
import Admin from './Component/Admin/Admin'
import Contact from './Contact'
import Login from './Component/Login/SignUp'
import Register from './Component/Login/Register'
import SignUp from './Component/Login/SignUp'
import ProductFeedback from './Component/Feedback/ProductFeedback'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/home' element = {<Home />} />
        <Route path='/products' element = {<Products />} />
        <Route path='/wishlist' element = {<WishList />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/checkout' element = {<Checkout />} />
        <Route path='/order-summary' element = {<OrderSummary />} />
        <Route path='/sign' element = {<SignUp />} />
        <Route path='/admin-page' element = {<Admin />} />
        <Route path='/contacts' element = {<Contact />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/product-feedback' element = {<ProductFeedback />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
