import React, { useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import '../Feedback/ProductFeedback.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as Star } from '@fortawesome/free-solid-svg-icons';

export default function ProductFeedback() {
    const location = useLocation();
    const { state } = location;
    const { image, name } = state || {};
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const navigate = useNavigate();

    const submitFeedback = () => {
        const textArea = document.getElementById('messageArea').value;
        const data = {
            "Product Name": name,
            "Customer Rating": rating,
            "Customer Review": textArea
        };

        fetch(
            'https://shop-list-19c4c-default-rtdb.firebaseio.com/customer-review.json',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            if (response.ok) {
                alert('Feedback submitted successfully!');
            } else {
                alert('Failed to submit feedback. Please try again.');
            }
        }).catch(error => {
            console.error('Error submitting feedback:', error);
            alert('An error occurred while submitting feedback. Please try again.');
        });
        navigate("/order-summary");
    };

    return (
        <>
            <main id='container'>
                <section id='prdct-sec'>
                    <img src={image} alt="" />
                    <h2>{name}</h2>
                </section>
                <section id='feedback-form-sec'>
                    <h2>
                        ADD YOUR FEEDBACK
                    </h2>
                    <p>
                        This gives us to improve our organization's growth and deliver products to customer at right time.
                    </p>
                    <form action="" id='prdt-feed-form'>
                        <span id='star-container'>
                            {
                                [...Array(5)].map((star, index) => {
                                    const currentRating = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name='rating'
                                                value={currentRating}
                                                onClick={() => setRating(currentRating)}
                                            />
                                            <FontAwesomeIcon
                                                icon={Star}
                                                id='star'
                                                color={currentRating <= (hover || rating) ? "#ffc107" : "gray"}
                                                onMouseEnter={() => setHover(currentRating)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    )
                                })
                            }
                        </span>
                        <textarea type="textarea" name="" id="messageArea" className='comment-area' placeholder='How can we help?' />
                        <button id='submit-feed' onClick={submitFeedback}>
                            Submit Feedback
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
