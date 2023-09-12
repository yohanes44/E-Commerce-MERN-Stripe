import React from 'react'


import {popularProducts} from "../../data"
import Product from './Product'

import "./products.scss"

export default function Products() {
  return (
    <div className='productsContainer'>
        {
            popularProducts.map((pro, i) => (
                <Product item={pro} key={pro.id}/>
            ))
        }
    </div>
  )
}
