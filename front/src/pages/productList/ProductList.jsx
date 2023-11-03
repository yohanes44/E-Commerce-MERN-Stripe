

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
  
    const [ categories, setCategories] = useState([]);

    const [selectedFilter, setSelectedFilter] = useState({
        color: "all",
        size: "all",
        sort: "newest"
    });

    const [filters, setFilters] = useState({
        color: [],
        size: [],
        sort: []
    });



    useEffect(()=>{

        const fetchData = async ()=>{
            console.log(category);

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
          setCategories(response.categories.map(
             (cat) =>{
                return cat.name
             }
          ));


          const productAndVariationQuery = gql`
          query getProductAndVariation($category: String!) {
            productAndVariation(category: $category) {
                    id,
                    name,
                    desc,
                    category{
                         id,
                      name
                    }
                    variation{
                      id,
                      color,
                      size
                    }
            }
          }
        `;

         const productAndVariationVariables = { category: category }; // Define your variable object

        let responseProductAndVariation = await request(
          backEndGraphQLURL,
          productAndVariationQuery,
          productAndVariationVariables
        )

        let tempCats = [];
        let tempColors = [];
        let tempSizes = [];
        

        responseProductAndVariation.productAndVariation.map( (pro) => {

                if(pro.variation.length > 0) {
                    pro.variation.map( (variation) => {
                          if(!tempColors.includes(variation.color)){
                              tempColors.push(variation.color);
                          }
                    })

                    pro.variation.map( (variation) => {
                        if(!tempSizes.includes(variation.size)){
                            tempSizes.push(variation.size);
                        }
                    })
                }
        } )


    setFilters( (filter) => {
            return {
                ...filter, color: tempColors, size: tempSizes
            }
        } )
        }

        fetchData();
        
    }, [category])

  
    if(category){

    }

  return (
    <div className='productListContainer'>
        <Navbar />
        <Announcement />
        <h1 className="title">{category}</h1>
        <div className="filterContainer">
            <div className="filter">
                <div>
                    <ul>
                        <li>Color: {selectedFilter.color}</li>
                        <li>Size: {selectedFilter.size}</li>
                        <li>Sort: {selectedFilter.sort}</li>
                    </ul>
                </div>
                <span className="filterText">Filter Products:</span>
                <select name="" id="" onChange={
                    (e)=>{
                        setSelectedFilter((prevState) =>{
                            return {
                                ...prevState, color: e.target.value
                            }
                        });
                    }
                }>
                     <option value="all" defaultValue>Color(all)</option>
                    { 
                        filters.color.map( (cr) => {
                            return <option value={cr} >{cr}</option>
                        })
                    }
                </select>
                <select name="" id="" onChange={
                    (e)=>{
                        setSelectedFilter((prevState) =>{
                            return {
                                ...prevState, size: e.target.value
                            }
                        });
                    }
                }>
                    <option value="all" defaultValue>Size(all)</option>
                    {
                        filters.size.map( (size) => {
                            return <option value={size} >{size}</option>
                        } )
                    }
                </select>
            </div>
            <div className="filter">
                <span className="filterText">Sort Products:</span>
                <select name="" id="" onChange={
                    (e) => {
                        setSelectedFilter( (prev) => {
                            return {
                                ...prev, sort: e.target.value
                            }
                        } )
                    }
                }>
                    <option value="newest" selected>Newest</option>
                    <option value="price(asc)" >Price (asc)</option>
                    <option value="price(desc)" >Price (desc)</option>
                    <option value="alphbetical(asc)" >Alphbetical (asc)</option>
                    <option value="alphbetical(desc)" >Alphbetical (desc)</option>
                </select>
            </div>
        </div>
        <Products selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} setFilters={setFilters} />
        <NewsLetter />
        <Footer />
    </div>
  )
}
