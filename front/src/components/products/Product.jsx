import { Circle, FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'

import "./product.scss"
import { Link } from 'react-router-dom'

export default function Product({item}) {
  return (
    <div className='productContainer'>
            <Link to={`/product/${item.id}`}>
      
        <img src={ (item.img) ? item.img : "http://localhost:3005/api/image/product/productDefaultPic.png"} alt="itemImg" />
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
            </Link>
    </div>
  )
}
