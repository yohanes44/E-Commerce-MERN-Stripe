import React, {useState, useEffect} from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';

import "./list.scss"
import Datatable from '../../../components/admin/datatable/Datatable';


import { useLocation, useNavigate } from 'react-router-dom';

import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import  backEndGraphQLURL from '../../../utility/http';

import Navbar from '../../../components/Navbar/Navbar'
import Announcement from '../../../components/announcements/Announcement'
import Footer from '../../../components/footer/Footer'
import { Add, Remove } from '@mui/icons-material'

import { useAuth } from "../../../utility/context/auth";
import { useCart } from "../../../utility/context/cart";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import { rows } from '../../../dataTableSource';


export default function ListAdmin() {

   const {isAuthenticated, setAuthenticated, login, setToken, user} = useAuth();
   const {cartItems, setCartItems, addOrder, findCartItems, cancelCartItem, updateCartItemQuantity} = useCart(); 

   const navigate = useNavigate();

   const location = useLocation();
   const listType = location.pathname.split("/")[2]
   
   const [headers, setHeaders] = useState([]);

   


   const [rows, setRows] = useState([]);
 
   useEffect(()=>{

    const fetchData = async () => {
        // console.log({listType});
        
        try{

            let  query = null;
            let variables = null;
            let dotWalkField = null;
            let response = null;
    
            if(listType == "users"){
                setHeaders([
                    {
                        field: 'id',
                        headerName: "Id", 
                       
                    },
                    {
                        field: 'firstName',
                        numeric: true,
                        disablePadding: false,
                        headerName: 'First Name',
                       
                      },
                      {
                        field: 'lastName',
                        numeric: true,
                        disablePadding: false,
                        label: 'Last Name',
                      },
                      {
                        field: 'email',
                        numeric: true,
                        disablePadding: false,
                        width: 250,
                        label: 'Email',
                      },
                ])
    
                query = gql`
                {
                  users{
                    id,
                    firstName,
                    lastName,
                    email
                  }
                }
              `
                dotWalkField = "users";

                response = await request(backEndGraphQLURL, query);  
    
            }
    
            if(listType == "products"){
                setHeaders([
                    {
                        field: 'id',
                        numeric: true,
                        headerName: "Id", 
                       
                    },
                    {
                        field: 'name',
                        numeric: false,
                        disablePadding: false,
                        headerName: 'Name',
                       
                      },
                      {
                        field: 'desc',
                        numeric: false,
                        disablePadding: false,
                        headerName: 'Description',
                      },
                      {
                        field: 'brand',
                        numeric: false,
                        disablePadding: false,
                        width: 250,
                        label: 'Brand',
                      },
                ])
                let selectedFilter = {};
                let category = "";
    
                query = gql`
                query products($category: String!, $selectedFilter: ProductFilterInput!) {
                    products(category: $category, selectedFilter: $selectedFilter) {
                           id, 
                           name, 
                           desc,
                           brand,
                           variation{
                                id,
                                img, 
                                color
                            }
                }}
              `;
               variables = { category, selectedFilter }; // Define your variable object
               dotWalkField = "products";
               response =   await request(backEndGraphQLURL, query, variables);
            }

            if(listType == "orders"){

                setHeaders([
                    {
                        field: 'id',
                        numeric: true,
                        headerName: "Id",
                    },
                    {
                      field: 'user',
                      numeric: false,
                      width: 150,
                      disablePadding: false,
                      headerName: 'User',
                     
                    },
                    {
                        field: 'product',
                        numeric: false,
                        width: 150,
                        disablePadding: false,
                        headerName: 'Product',
                       
                      },
                      {
                        field: 'variation',
                        numeric: false,
                        width: 200,
                        disablePadding: false,
                        headerName: 'Variation',
                      },
                      {
                        field: 'category',
                        numeric: false,
                        width: 150,
                        disablePadding: false,
                        headerName: 'Category',
                       
                      },
                      {
                        field: 'quantity',
                        numeric: false,
                        width: 100,
                        disablePadding: false,
                        headerName: 'Quantity',
                       
                      },
                      {
                        field: 'date',
                        numeric: false,
                        width: 150,
                        disablePadding: false,
                        headerName: 'Date',
                       
                      },
                      // {
                      //   field: 'state',
                      //   numeric: false,
                      //   disablePadding: false,
                      //   label: 'State',
                      // },
                     
                      // {
                      //   field: 'user',
                      //   numeric: false,
                      //   disablePadding: false,
                      //   width: 150,
                      //   label: 'User',
                      // },
                ])

                let selectedFilter = {};
                let category = "";
    
                query = gql`
                {
                    orderedCartItems{
                        id,
                        variationId,
                        state,
                        quantity
                        product{
                          id,
                          name,
                          img,
                          price,
                          category {
                            id,
                            name
                          }
                        }
                        variation {
                          id,
                          img,
                          color,
                          size
                        },
                        user{
                          id,
                          firstName,
                          lastName,
                          email
                        },
                        order{
                          id,
                          date
                        }    
                  }
                }
              `
               dotWalkField = "orderedCartItems";



               response =  await request(backEndGraphQLURL, query);
               let temp = response[dotWalkField].map( (obj) => {
                  let newObj = {};
                  
                  newObj.id = obj.id;
                  newObj.user = `${obj.user.firstName}  ${obj.user.lastName}`;
                  newObj.product = obj.product.name;
                  newObj.quantity = obj.quantity;
                  newObj.category = obj.product.category.name;
                  newObj.state = obj.state;
                  newObj.variation = `${obj.product.name}-${obj.variation.color}-${obj.variation.size}`;
                  newObj.date = obj.order.date;
                  newObj.orderId = obj.order.id;
                  
                  // newObj.user = `${obj.user.email}`;
                  return newObj;
               })

               response[dotWalkField] =  temp;


            }
    
             setRows(response[dotWalkField]);
        
        }
        catch(err){
            console.log(err.message);
        }
       
    }

    fetchData();

   }, [listType])


    return (

      
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable  headers={headers} rows={rows} title={listType}/>
            </div>
        </div>
    );
}
