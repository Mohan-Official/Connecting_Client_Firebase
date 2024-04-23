import React from 'react'
import Card from './Component/Card/Card'
import ProductData from "./Product.json"
import Footer from './Component/Footer/Footer'
export default function Products() 
{
  return (
    <main id='Product-container'>
        {
            ProductData.map((product,index)=>
            (
                <Card key={index+1} id={product['Product-Id']} image={product['Product-Image']} name={product['Product-Name']} description={product['Product-Description']} price={product['Product-Price']} />
            ))
        }
    </main>    
  )
}
