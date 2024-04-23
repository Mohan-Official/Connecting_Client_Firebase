import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section id='Home-Banner-Container'>
          <div className='section-one'>
            <img src="https://wallpapercave.com/wp/wp9625953.jpg" alt="" />
          </div>
          <div className='section-two'>
            <div className='sub-sec-one'>
                <div className='sub-sec-three'>
                  <img src="https://wallpapercave.com/wp/wp9625971.jpg" alt="" />
                </div>
                <div className='sub-sec-four'>
                  <img src="https://wallpapercave.com/wp/wp9626014.jpg" alt="" />
                </div>
            </div>
            <div className='sub-sec-two'>
              <img src="https://wallpapercave.com/wp/wp9626011.jpg" alt="" />
            </div>
          </div>
      </section>

      <section id='add-banner'>
          <div id='text-add'>
              <h1>THIS WEEK TRENDING !!</h1>
              <p>
                Furniture encompasses movable objects for various human activities, serving both functional and decorative purposes while influencing interior design and ambiance.
              </p>
          </div>
          <div id='image-add'>
            <section id='img-add-one'>
              <img src="https://www.at-home.co.in/cdn/shop/products/BellaSwingchairLS.jpg?v=1669287788" alt="" />
              <span id='img-one-text'>
                <h1>
                  PERFECT SWING CHAIR
                </h1>
                <button>
                  SHOP NOW
                </button>
              </span> 
            </section>
            <section id='img-add-two'>
              <img src="https://m.media-amazon.com/images/I/61Q1hvMM7BL._AC_UF894,1000_QL80_DpWeblab_.jpg" alt="" />
              <span id='img-two-text'>
                <h1>
                    ELITE TEA TABLE
                  </h1>
                  <button>
                    SHOP NOW
                  </button>
              </span>
            </section>
          </div>
      </section>
      <button id='purchase-btn' onClick={()=>(navigate('/products'))}>
        PURCHASE
      </button>
    </>
  )
}
