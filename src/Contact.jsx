import React from 'react'
import FeedbackForm from '../src/Component/Feedback/FeedbackForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Footer from './Component/Footer/Footer'


export default function Contact() {
  return (
    <>
        <section className="formSection">
            <section className='storeAddress'>
                <label>STORE INFORMATION</label>
                <span>
                    <FontAwesomeIcon icon={faLocationDot} className='storeIcons' />
                    <p>
                    Decor <br />
                    16, Main street 2nd floor
                    Paris, Hawaii 75002
                    United States
                    </p>
                </span>
                <span>
                    <FontAwesomeIcon icon={faPhone} className='storeIcons' />
                    <p>
                        Call us:
                        <a href="">0102030405</a>
                    </p>
                </span>
                <span>
                    <FontAwesomeIcon icon={faEnvelope} className='storeIcons' />
                    <p>
                        Email us:
                        <a href="">mohan@gmail.com</a>
                    </p>
                </span>
            </section>
            <FeedbackForm />
        </section>
    </>
  )
}
