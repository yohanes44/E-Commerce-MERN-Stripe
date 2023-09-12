import React from 'react'

import { categories } from '../../data'
import CategoryItem from './CategoryItem'

import "./categories.scss"

export default function Categories() {
  return (
    <div className='categoriesContainer'>
        {
            categories.map((category) => (
                <CategoryItem item={category}/>
            ))
        }
    </div>
  )
}
