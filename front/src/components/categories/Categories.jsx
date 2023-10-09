

import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request'; // Import necessary functions and objects


// import { categories } from '../../data'
import CategoryItem from './CategoryItem'

import "./categories.scss"
import  backEndGraphQLURL from '../../utility/http';


export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    
    const fetchData = async ()=>{
      try{
        const query = gql`
          {
            categories{
              id,
              name,
              img
            }
          }
        `
        const response = await request(backEndGraphQLURL, query);
        setCategories(response.categories);
        setLoading(false);
      }
      catch(err){
        setError(err);
        setLoading(false)
      }
    }

     fetchData();
  }, categories);




  return (
    <div className='categoriesContainer'>
        { 
          loading? <h2>loading</h2> ? error: <h2>error</h2>:  
            categories.map((category) => (
            <CategoryItem key={category.id} item={category}/>
         ))
        }
    </div>
  )
}
