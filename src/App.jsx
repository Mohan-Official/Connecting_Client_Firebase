import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Home'
import Navbar from './Component/Navbar'
import Products from './Products'
import WishList from './WishList'
import Footer from './Component/Footer/Footer'
import Cart from './Cart'
import Checkout from './Component/Checkout/Checkout'
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
      </Routes>
      <Footer />
    </>
  )
}

export default App
