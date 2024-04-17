import React from 'react'
import "./Footer.css"
import {NavLink} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter, faPinterestP, faGooglePlus} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {

    ////// under maintenane
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(e.target.value);
    }
  return (
    <>
        <section className="footerSection">
            <div className="addressSection">
                <h1>DEcOR</h1>
                <p>2593 Timbercrest Road, Chisana, Alaska Badalas United State</p>
                <p>(+01)2-345-6789</p>
                <a href='https://demo80.leotheme.com/cdn-cgi/l/email-protection#9afefff7f5dafefff7f5b4f9f5f7'>[email protected]</a>
            </div>
            <div className="ouPrdt">
                <h4>Our Products</h4>
                <ul>
                    <NavLink className="NavLink" to=''>Best Sellers</NavLink>
                    <NavLink className="NavLink" to=''>New In</NavLink>
                    <NavLink className="NavLink" to=''>Chairs</NavLink>
                    <NavLink className="NavLink" to=''>Sofas</NavLink>
                </ul>
            </div>
            <div className="ourLinks">
                <h4>Useful Links</h4>
                <ul>
                    <NavLink className="NavLink" to=''>About Us</NavLink>
                    <NavLink className="NavLink" to=''>Blog</NavLink>
                    <NavLink className="NavLink" to=''>FAQs</NavLink>
                    <NavLink className="NavLink" to=''>Contact</NavLink>
                </ul>
            </div>
            <div className="subscription">
                <h4>Newsletter</h4>
                <label>Stay Updated on all that's new add noteworthy</label>
                <form onSubmit={()=>{handleSubmit(e)}} className='emailSection'>
                    <input type="mail" name="mail" id="emailBox" placeholder='Your email address' required/>
                    <button>SUBSCRIBE</button>
                </form>
                <span className='iconSection'>
                    {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                    <a href=""><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href=""><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href=""><FontAwesomeIcon icon={faPinterestP} /></a>
                    <a href=""><FontAwesomeIcon icon={faGooglePlus} /></a>
                </span>
            </div>
        </section>
    </>
  )
}
