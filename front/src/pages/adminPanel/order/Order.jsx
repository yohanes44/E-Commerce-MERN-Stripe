
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import SalesPerformance from '../../../components/salesPerformance/salesPerformance';


import { useLocation, useNavigate } from 'react-router-dom';


import "./order.scss"

import joImg from "../../../images/category/shirt5.jpg"

import Chart from "../../../components/chart/Chart"

import { Publish, DriveFolderUploadOutlined } from '@mui/icons-material';
import Datatable from '../../../components/admin/datatable/Datatable';



import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import backEndGraphQLURL from '../../../utility/http';

import { Link } from "react-router-dom";     
 

function Order() {

    const [productImg, setProductImg] = useState(joImg);
    const [product, setProduct] = useState({
        id: null,
        name: null,
        desc: null,
        img: null,
        brand: null,
        isActive: null,
        price: null,
        variation: {
            id: null,
            color: null,
            size: null
        },
        category: {
            id: null,
            name: null
        }
    });

    const [user, setUser] = useState({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        img: null,
        address:{
            city: null,
            sub_city: null,
            phoneNumber: null
        }
    });


    const location = useLocation();

    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);




    const orderId = parseInt(location.pathname.split("/")[3]);

    // console.log({orderId});

    const [order, setOrder] = useState(
        [{
        
            id: null,
            productId: null,
            variationId: null,
            userId: null,
            orderId: null,
            state: null,
            quantity: 4,
            cart: [],
            user: {
              id: null,
              firstName: null,
              lastName: null,
              email: null,
              address: {
                city:null,
                sub_city: null,
                phoneNumber: null
              }
            },
            product: {
              id: null,
              name: null,
              img: null,
              category:{
                name: null
              }
            },
            variation: {
              id: null,
              img: null,
              color: null,
              size: null
            },
            order: {
              id:null,
              state: null,
              total: null,
              date: null,
              user: {
                id: null
              }
            }
        }]
    );
        
    
    useEffect(() => {

        let fetchData = async () => {
            try {

                let query = null;
                let variables = null;
                let dotWalkField = null;
              
                // cart{
                //     id,
                //     productId,
                //     variationId,
                //     userId,
                //     orderId,
                //     state,
                //     quantity,
                // },
              
                // query = gql`
                //     query order($id: Int!) {
                //         order(id: $id) {
                //             id,
                //             state,
                //             total,
                //             date,
                         
                //             user{
                //                     id,
                //                 firstName,
                //                 lastName,
                //                 email,
                //                 img,

                //               address{
                //                 city,
                //                 sub_city,
                //                 phoneNumber
                //               }
                //             }
                //     }}
                //   `;

                query = gql`
                query orderedCartItemsByOrderId($id: Int!) {
                    orderedCartItemsByOrderId(id: $id) {
                        id,
                        productId,
                         variationId,
                         userId,
                         orderId,
                         state,
                         quantity,
                        ,
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
                       price
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

                variables = { id: orderId }; // Define your variable object
                dotWalkField = "orderedCartItemsByOrderId";
                console.log("test above 2");
                let response = await request(backEndGraphQLURL, query, variables);
                console.log({ response });
                // setProduct(response.orderedCartItemsById);
                setOrder(response.orderedCartItemsByOrderId);
                // setUser(response.order.user);
                console.log({ order: response.orderedCartItemsByOrderId });
                let temp = response.orderedCartItemsByOrderId.map( (obj) => {
                    let newObj = {};
                    
                    newObj.id = obj.id;
                    newObj.product = `${obj.product.brand} ${obj.product.name}`;
                    newObj.variation = `Color: ${obj.variation.color}, Size: ${obj.variation.size}`;
                    newObj.quantity = obj.quantity;
                    newObj.category = obj.product.category.name;
                    newObj.date = obj.order.date;
                    newObj.totalPrice = `Birr `+ obj.product.price * obj.quantity;
                    newObj.img = obj.variation.img || obj.product.img;
                    // newObj.user = `${obj.user.email}`;
                    return newObj;
                 })

                setRows(temp);
                 
                setHeaders([
                    
                    {
                        field: 'id',
                        numeric: true,
                        headerName: "Id",
                    },
                    {
                        field: 'product',
                        numeric: false,
                        disablePadding: false,
                        label: 'Product',
                        width: 300,
                        renderCell: (params) => {
                            return <div style={{
                                // border: "2px solid red",
                                display: "flex",
                                gap: "5%",
                                textAlign: "center"
                            }} >
                                 <img style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%"
                                }} src={params.row.img} />
                                <span style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>{params.row.product}</span>
                               
                            </div>
                        },

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
                        width: 100,
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
                        field: 'totalPrice',
                        numeric: false,
                        width: 100,
                        disablePadding: false,
                        headerName: 'Total Price',
                    },
                    {
                        field: 'date',
                        numeric: false,
                        width: 130,
                        disablePadding: false,
                        headerName: 'Date',
                    }, {
                        field: "action", 
                        headerName: "Action", 
                        width: 200,
                        renderCell: (params)=>{
                        return (<div className="cellAction">
                          <Link to="/adminPanel/" style={{textDecoration: "none"}}>
                          {/* <Link to={`/adminPanel/${listType}/${params.row.id}`} style={{textDecoration: "none"}}> */}
                          <div className="viewButton">
                            View
                          </div>
                          </Link>
                          <div className="deleteButton">
                            Delete
                          </div>
                        </div>)
                      } }
                    
                    
                ])


                console.log({temp, headers});
            }
            catch (err) {
                console.log(err.message);
            }
        }

        fetchData();
    }, [orderId])


    return (
        <div className="productAdmin">
            <Sidebar />
            <div className="productContainer2">
                <Navbar />
                {/* <div className="product">

                   {
                     (orders.length == 0) ? <div>{`No Orders With the id ${orderId}`}</div> : 
                   
   

                    <Datatable headers={headers} rows={rows} title="orders" />
                 
                }
                </div> */}

                <div className="ordersF">
                    <div className="order">
                        <div className="top">
                            <div className="userInfo">
                                <img src={ order[0].user.img || "http://localhost:3005/api/image/category/person.jpg"}  
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%"
                                }}
                                alt="" className="itemImg" />
                                <div className="details">
                                    <h1 className="itemTitle">{`${order[0].user.firstName} ${order[0].user.lastName}`}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Email: </span>
                                        <span className="itemValue">{order[0].user.email}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Phone: </span>
                                        <span className="itemValue">{order[0].user.address.phoneNumber}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Address: </span>
                                        <span className="itemValue">{order[0].user.address.city}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="orderInfo">
                                <div className="details">
                                    <h1 className="itemTitle">Order</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Total price: </span>
                                        <span className="itemValue">{order[0].order.total}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Total Products: </span>
                                        <span className="itemValue">{order  .length}</span>
                                    </div>
                                    {/* <div className="detailItem">
                                    <span className="itemKey">Address: </span>
                                    <span className="itemValue">city</span>
                                </div> */}
                                </div>
                            </div>

                        </div>
                        <div className="bottom">
                            <Datatable headers={headers} rows={rows} title="order" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Order;




{/* <div className="top">
                        <div className="title">Product</div>
                        <div className="createBtn">Create</div>
                    </div>
                    <div className="center">
                                <Chart
                                    aspect={4 / 1} title="Sales Performance"
                                    page="adminPanel/product"
                                    data={
                                        [
                                            { name: "January", Total: 4000 },
                                            { name: "February", Total: 3200 },
                                            { name: "March", Total: 4000 }
                                        ]
                                    } />
                        <div className="productHighLight">
                            <div className="productTitle">
                                <img src={product.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
                                <div className="productNamex">{product.name}</div>
                            </div>
                            <div className="productInfo">
                                <div className="productInfoItem">
                                    <span>id:</span>
                                    <span>{product.id}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span>sales:</span>
                                    <span>513</span>
                                </div>
                                <div className="productInfoItem">
                                    <span>in stock:</span>
                                    <span>{product.variation.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bottom">
                        <form>
                        <div className="productForm">
                            <label>Product Name</label>
                            <input type="text" placeholder='Product Title' value={product.name} />

                            <label> Product Description</label>
                            <input type="text" placeholder="Product Description" name="Product Desc"  value={product.desc}/>

                            <label> Price</label>
                            <input type="text" placeholder="2000" name="Product title" value={product.price} />

                            <label> In Stock</label>
                            <select name="inStock" id="inStock">
                                <option value="true">Yes</option>
                                <option value="false">Noo</option>
                            </select>
                        </div>
                        <div className="productImage">
                            
                            <div className="top">
                                <img src={ product.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } alt="" className="img" />
                                <label className="upload"  htmlFor='file'>
                                    <Publish  />
                                    <input type="file" id="file" 
                                        onChange={(e)=>setProductImg(URL.createObjectURL(new File([e.target.files[0]], 'product.jpg')))}
                                        style={{display: "none"}}   
                                    />
                                </label>
                                
                            </div>
                            <button className="update">Update</button>
                        </div>
                        </form>

                       
                    </div> */}