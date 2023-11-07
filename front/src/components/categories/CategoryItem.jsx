import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Link
} from "react-router-dom"


import "./categoryItem.scss"

export default function CategoryItem({ item }) {


  return (
    <div className='categoryItemContainer'>
      <h2>{item.name}</h2>
      <div className="wrapperItem">
        <img className='ciImg' src={item.img} alt="itemImg" />
        <div className="info">
          {/* <h3 className="title">{item.name}</h3> */}
          <Link to={`/products/${item.name}`}>
            <button>SHOP NOW</button>
          </Link>
        </div>
      </div>

    </div>
  )
}
