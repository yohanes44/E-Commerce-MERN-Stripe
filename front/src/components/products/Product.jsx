import { Circle, FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'

import "./product.scss"

export default function Product({item}) {
  return (
    <div className='productContainer'>
        <div className="circle">
            
        </div>
        <img src={item.img} alt="itemImg" />
        <div className="info">
            <div className="icon">
                <ShoppingCartOutlined />
            </div>
            <div className="icon">
                <SearchOutlined />
            </div>
            <div className="icon">
                <FavoriteBorderOutlined />
            </div>
        </div>
    </div>
  )
}
