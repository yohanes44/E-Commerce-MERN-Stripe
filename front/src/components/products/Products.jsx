
import React, {useState, useEffect} from 'react'

import { useLocation } from 'react-router-dom';

import { request, gql } from 'graphql-request'; // Import necessary functions and objects



import  backEndGraphQLURL from '../../utility/http';


import Product from './Product'

import "./products.scss"

export default function Products({ selectedFilter, setSelectedFilter, setFilters }) {
  
  const location = useLocation();
  const category = location.pathname.split("/")[2]

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    
    const fetchData = async ()=>{
      try{
        const productQuery = gql`
        query GetProducts($category: String!, $selectedFilter: ProductFilterInput!) {
          products(category: $category, selectedFilter: $selectedFilter) {
            id
            name
            img
          }
        }
        `

        console.log(selectedFilter);
        const variables = { category, selectedFilter }
        const responseProduct = await request(backEndGraphQLURL, productQuery, variables);

        console.log("responseProduct");
        console.log(responseProduct);

        setProducts(responseProduct.products);
        setLoading(false);
      }
      catch(err){
        setError(err);
        setLoading(false)
      }
    }

     fetchData();
  

  }, [category, selectedFilter.color, selectedFilter.size]);

  return (
    <div className='productsContainer'>
        {
            products.map((product, i) => (
                <Product item={product} key={product.id}/>
            ))
        }
    </div>
  )
}
