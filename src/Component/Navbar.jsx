import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
        <nav className="navbar">
          <NavLink to="/home" className="navLinks">Home</NavLink>
          <NavLink to="/shop"  className="navLinks">Signature</NavLink>
          <NavLink to="/products" className="navLinks">Products</NavLink>
          <NavLink to="/wishlist"  className="navLinks">Wish List</NavLink>
          <NavLink to="/cart"  className="navLinks">Cart</NavLink>
          <NavLink to="/contacts" className="navLinks">Contact</NavLink>
        </nav>
    </>
  )
}
