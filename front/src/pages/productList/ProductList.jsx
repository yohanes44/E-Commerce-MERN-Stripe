

import React, {useState, useEffect} from 'react'

import { useLocation } from 'react-router-dom';

import { request, gql } from 'graphql-request'; // Import necessary functions and objects



import  backEndGraphQLURL from '../../utility/http';

import "./productList.scss"
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/announcements/Announcement'
import Products from '../../components/products/Products'
import NewsLetter from '../../components/newsLetter/NewsLetter'
import Footer from '../../components/footer/Footer'

export default function ProductList() {

    const location = useLocation();
    const category = location.pathname.split("/")[2]
  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
   

  return (
    <div className='productListContainer'>
        <Navbar />
        <Announcement />
        <h1 className="title">{category}</h1>
        <div className="filterContainer">
            <div className="filter">
                <span className="filterText">Filter Products:</span>
                <select name="" id="">
                    <option value="" disabled selected>Color</option>
                    <option value="" >White</option>
                    <option value="" >Black</option>
                    <option value="" >Red</option>
                    <option value="" >Blue</option>
                    <option value="" >Yellow</option>
                    <option value="" >Green</option>
                </select>
                <select name="" id="">
                    <option value="" disabled selected>Size</option>
                    <option value="" >XS</option>
                    <option value="" >S</option>
                    <option value="" >M</option>
                    <option value="" >L</option>
                    <option value="" >XL</option>
                </select>
            </div>
            <div className="filter">
                <span className="filterText">Sort Products:</span>
                <select name="" id="">
                    <option value="" selected>Newest</option>
                    <option value="" >Price (asc)</option>
                    <option value="" >Price (desc)</option>
                </select>
            </div>
        </div>
        <Products/>
        <NewsLetter />
        <Footer />
    </div>
  )
}
