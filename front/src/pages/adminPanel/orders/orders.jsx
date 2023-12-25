
import React, {useState, useEffect} from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import SalesPerformance from '../../../components/salesPerformance/salesPerformance';


import { useLocation, useNavigate } from 'react-router-dom';


import "./orders.scss"

import joImg from "../../../images/category/shirt5.jpg"

import Chart from "../../../components/chart/Chart"

import {Publish, DriveFolderUploadOutlined} from '@mui/icons-material';
import Datatable from '../../../components/admin/datatable/Datatable';

import { Link } from "react-router-dom";     
                  

import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import  backEndGraphQLURL from '../../../utility/http';

import avatarImg from "../../../../src/images/category/shoes3.jpg"

function Product() {

    const [productImg, setProductImg] = useState(joImg);
    const [product, setProduct] = useState({
        id: null, 
        name: null,
        desc: null,
        img: null,
        brand: null,
        isActive: null,
        price: null,
        variation:{
         id: null,
         color: null,
         size: null
        },
        category:{
         id: null,
         name: null
        }
    });

    const location = useLocation();

  

    const productId = parseInt(location.pathname.split("/")[3]);

    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [productVariations, setProductVariations] = useState([]);


    const [orders, setOrders] = useState([{
        key: 1,
        values: [
                {
                    id: null,
                    order: {
                        date: null,
                        id: null,
                        state: null,
                        total: null
                    },
                    product: {
                        // abrand,

                    },
                    user: {
                        firstName: null,
                        lastName: null,
                        email: "yo@g.com",
                        img: null
                    }
                }
        ]
    }]);

    
    useEffect(()=>{
   
        let fetchData = async () => {
            try{


             let productQuery = gql`
                    query orderedCartItemsOrderedByOrderId{
                        orderedCartItemsOrderedByOrderId{
                            id,
                            productId,
                             variationId,
                             userId,
                             orderId,
                             state,
                             quantity,
                             user{
                           id, 
                           firstName,
                           lastName,
                           email,
                           img,
                           address{
                             city,
                             sub_city,
                             phoneNumber
                           }
                         },
                         product{
                           id,
                           name,
                           img,
                           brand,
                           price,
                           category{
                            name
                           }
                         },
                         variation{
                           id,
                           img,
                           color,
                           size
                         },
                        order{
                         id,
                         state,
                         total,
                         date,
                       }
                    }}
                  `;

            let response =   await request(backEndGraphQLURL, productQuery);
            
      

                   const groupByArray = (array, key) => {
                    return Object.entries(array.reduce((result, item) => {
                      const keyValue = item[key];
                      result[keyValue] = result[keyValue] || [];
                      result[keyValue].push(item);
                      return result;
                    }, {})).map(([key, values]) => ({ key, values }));
                  };


                  const groupedData = groupByArray(response.orderedCartItemsOrderedByOrderId, 'orderId');
                
                  setOrders(groupedData);
                //    setProduct(productResponse.product);



}
            catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, [])


    return (
        <div className="productAdmin">
            <Sidebar />
            <div className="productContainer2">
                <Navbar />
                <h1>Orders here</h1>
                {/* {
                <h1>${orders}</h1>
                } */}
                <div className="orders">

                    {
                      orders.map((order) => {
                            return  <Link to={`/adminPanel/orders/${order.values[0].order.id}`} 
                            style={{
                                textDecoration: "none",
                                color: "black"
                                }}>
                            <div className="order">
                                   <div className="left">
                                        <div className="user">
                                            <div className="userImg">
                                                <img src={order.values[0].user.img || avatarImg} alt="" />
                                            </div>
                                            <div className="userInfo">
                                                <div className="userInfoItem">
                                                    {/* <span>id:</span> */}
                                                    <span>{order.values[0].user.email}</span>
                                                </div>
                                                <div className="userInfoItem">
                                                    {/* <span>Full Name:</span> */}
                                                    <span>{`${order.values[0].user.firstName} ${order.values[0].user.lastName}`}</span>
                                                </div>
                                            </div>
                                        </div>
            
                                    </div>
                                    <div className="right">
                                        <div className="orderInfo">
                                                <div className="orderInfoItem">
                                                    <span>Total Products: </span>
                                                    <span>{order.values.length}</span>
                                                </div>
                                                <div className="orderInfoItem">
                                                    <span>Total Price: </span>
                                                    <span>{order.values[0].order.total}</span>
                                                </div>
                                                <div className="orderInfoItem">
                                                    <span>Date: </span>
                                                    <span>10/Nov/2023</span>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                    </Link>
                         
     
                        })
                    }
                   

           
                </div>
            </div>
        </div>
    );
}

export default Product;