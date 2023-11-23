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

import { Link } from "react-router-dom";     

import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {Delete} from '@mui/icons-material';

export default function ListAdmin() {

   const {isAuthenticated, setAuthenticated, login, setToken, user} = useAuth();
   const {cartItems, setCartItems, addOrder, findCartItems, cancelCartItem, updateCartItemQuantity} = useCart(); 

   const navigate = useNavigate();

   const location = useLocation();
   const listType = location.pathname.split("/")[2]
   
   const [headers, setHeaders] = useState([]);
   const [refetcher, setRefetcher] = useState(false);
   
    async function deleteUser(id){
      try{
        const deleteUserMutation = gql`
        mutation deleteUser($id: Int!) {
          deleteUser(id: $id) {
            id
          }
        }
      `;
        const variables = { id: parseInt(id)};
        let responseLogin= await request(backEndGraphQLURL,deleteUserMutation,variables);
        
        setRefetcher(true);
      }
      catch(err){
        console.log(err.message);
      }
    }


    async function deleteProduct(id){

     
      try{
        console.log({deleteProductId :id});

        const deleteProductMutation = gql`
        mutation deleteProduct($id: Int!) {
          deleteProduct(id: $id) {
            id
          }
        }
      `;
        const variables = { id: parseInt(id)};
        let responseLogin= await request(backEndGraphQLURL,deleteProductMutation,variables);
        console.log({responseLogin});
        
        setRefetcher(true);
      }
      catch(err){
        console.log(err.message);
      }
    }

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
                
                // console.log({respRows: response[dotWalkField]});

                let newResponse = response[dotWalkField].map((obj) => {
                     obj.id = parseInt(obj.id);
                     return obj
                     // console.log({obj});
                })
               //  console.log({newResponse});
                setRows(newResponse);
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
                      renderCell: (params)=>{

                        console.log({params, newResponse});
                        return (<div className="cellAction">
                            <span>
                              {params.row.email}
                            </span>
                            
                            {
                              true ?
                              <input type='text' value={params.formattedValue} onChange={(e) => {
                                  // setRows((prev) => {
                                  //   return {
                                  //     ...prev, 
                                  //   }
                                  // })
                              }}/>
                              : null
                            } 
                        </div>)
                      } 
                    },
                    {
                      field: "action", 
                      headerName: "Action", 
                      width: 200,
                      renderCell: (params)=>{
                      return (<div className="cellAction">
                        {/* <Link to={`/adminPanel/${listType}/${params.row.id}`} style={{textDecoration: "none"}}> */}
                       
                        <Link to={`/adminPanel/users/${params.row.id}`} style={{textDecoration: "none"}}>
                        <div style={{
                          // color: "red",
                          cursor: "pointer"
                        }}>
                          <VisibilityIcon />
                        </div>
                        </Link>
                        <div style={{
                          // color: "red",
                          cursor: "pointer"
                        }}>
                        
                         <EditIcon />
                        </div>
                        <div  onClick={(e) => {
                          deleteUser(params.row.id)
                        }} style={{
                          color: "red",
                          cursor: "pointer"
                        }}>
                          <Delete />
                        </div>
                      </div>)
                    } 
                  }
                  
              ])
  
            }
    
            

            // if(listType == "orders"){

            //     setHeaders([
            //         {
            //             field: 'id',
            //             numeric: true,
            //             headerName: "Id",
            //         },
            //         {
            //           field: 'user',
            //           numeric: false,
            //           width: 150,
            //           disablePadding: false,
            //           headerName: 'User',
                     
            //         },
            //         {
            //             field: 'product',
            //             numeric: false,
            //             width: 150,
            //             disablePadding: false,
            //             headerName: 'Product',
                       
            //           },
            //           {
            //             field: 'variation',
            //             numeric: false,
            //             width: 200,
            //             disablePadding: false,
            //             headerName: 'Variation',
            //           },
            //           {
            //             field: 'category',
            //             numeric: false,
            //             width: 150,
            //             disablePadding: false,
            //             headerName: 'Category',
                       
            //           },
            //           {
            //             field: 'quantity',
            //             numeric: false,
            //             width: 100,
            //             disablePadding: false,
            //             headerName: 'Quantity',
                       
            //           },
            //           {
            //             field: 'date',
            //             numeric: false,
            //             width: 150,
            //             disablePadding: false,
            //             headerName: 'Date',
                       
            //           },
                      
            //           // {
            //           //   field: 'state',
            //           //   numeric: false,
            //           //   disablePadding: false,
            //           //   label: 'State',
            //           // },
                     
            //           // {
            //           //   field: 'user',
            //           //   numeric: false,
            //           //   disablePadding: false,
            //           //   width: 150,
            //           //   label: 'User',
            //           // },
            //     ])

            //     let selectedFilter = {};
            //     let category = "";
    
            //     query = gql`
            //     {
            //         orderedCartItems{
            //             id,
            //             variationId,
            //             state,
            //             quantity
            //             product{
            //               id,
            //               name,
            //               img,
            //               price,
            //               category {
            //                 id,
            //                 name
            //               }
            //             }
            //             variation {
            //               id,
            //               img,
            //               color,
            //               size
            //             },
            //             user{
            //               id,
            //               firstName,
            //               lastName,
            //               email
            //             },
            //             order{
            //               id,
            //               date
            //             }    
            //       }
            //     }
            //   `
            //    dotWalkField = "orderedCartItems";



            //    response =  await request(backEndGraphQLURL, query);
            //    let temp = response[dotWalkField].map( (obj) => {
            //       let newObj = {};
                  
            //       newObj.id = obj.id;
            //       newObj.user = `${obj.user.firstName}  ${obj.user.lastName}`;
            //       newObj.product = obj.product.name;
            //       newObj.quantity = obj.quantity;
            //       newObj.category = obj.product.category.name;
            //       newObj.state = obj.state;
            //       newObj.variation = `${obj.product.name}-${obj.variation.color}-${obj.variation.size}`;
            //       newObj.date = obj.order.date;
            //       newObj.orderId = obj.order.id;
                  
            //       // newObj.user = `${obj.user.email}`;
            //       return newObj;
            //    })

            //    response[dotWalkField] =  temp;


            // }

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
                    {
                      field: "action", 
                      headerName: "Action", 
                      width: 200,
                      renderCell: (params)=>{
                      return (<div className="cellAction">
                        <Link to={`/adminPanel/products/${params.row.id}`} style={{textDecoration: "none"}}>
                        {/* <Link to={`/adminPanel/${listType}/${params.row.id}`} style={{textDecoration: "none"}}> */}
                      
                        <div className="viewButton">
                          View
                        </div>
                        </Link>
                        <div className="deleteButton" onClick={(e) => {
                          deleteProduct(params.row.id)
                        }}>
                          Delete
                        </div>
                      </div>)
                    } }
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
        
            //  console.log({respRows: response[dotWalkField]});

             let newResponse = response[dotWalkField].map((obj) => {
                  obj.id = parseInt(obj.id);
                  return obj
                  // console.log({obj});
             })
            //  console.log({newResponse});
             setRows(newResponse);
            }
             

           
        
        }
        catch(err){
            console.log(err.message);
        }
       
    }

    fetchData();

   }, [listType, refetcher])


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
