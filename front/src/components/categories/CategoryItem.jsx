import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Link
} from "react-router-dom"


import "./categoryItem.scss"

export default function CategoryItem({item}) {


  return (
    <div className='categoryItemContainer'>
        <img className='ciImg' src={item.img} alt="itemImg" />
        <div className="info">
            <h1 className="title">{item.name}</h1>
            <Link to={`/products/${item.name}`}>
              <button>SHOP NOW</button>
            </Link>
        </div>
    </div>
  )
}
