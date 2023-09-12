import React from 'react'

import "./categoryItem.scss"

export default function CategoryItem({item}) {
  return (
    <div className='categoryItemContainer'>
        <img className='ciImg' src={item.img} alt="itemImg" />
        <div className="info">
            <h1 className="title">{item.title}</h1>
            <button>SHOP NOW</button>
        </div>
    </div>
  )
}
