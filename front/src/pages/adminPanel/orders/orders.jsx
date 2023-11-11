
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


    

    
    useEffect(()=>{
   
        let fetchData = async () => {
            try{


                    let productQuery = gql`
                    query product($id: Int!) {
                        product(id: $id) {
                               id, 
                               name,
                               desc,
                               img,
                               brand,
                               isActive,
                               price,
                               variation{
                                id,
                                color,
                                size
                               },
                               category{
                                id,
                                name
                               }

                    }}
                  `;

                  let productVariables = { id: productId }; // Define your variable object
                //    dotWalkField = "products";
                   let productResponse =   await request(backEndGraphQLURL, productQuery, productVariables);
                //   console.log({response});
                   setProduct(productResponse.product);

                      setHeaders([
        {
            field: 'id',
            numeric: true,
            headerName: "Id",
        },
          {
            field: 'color',
            numeric: false,
            width: 150,
            disablePadding: false,
            headerName: 'Color',
           
          },
          {
            field: 'quantity',
            numeric: false,
            width: 200,
            disablePadding: false,
            headerName: 'Quantity',
          },
          {
            field: 'img',
            numeric: false,
            disablePadding: false,
            label: 'Image',
            renderCell: (params) => <div style={{
                // border: "2px solid red"
            }} >
                <img style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%"
                }} src={params.value}/>
            </div>,

          },
    ])


                   let productVariationQuery = gql`
                   query productVariation($id: Int!) {
                    productVariation(id: $id) {
                        id,
                        color,
                        img,
                        quantity
                   }}
                 `;

                 
                 let productVariationVariables = { id: productId }; // Define your variable object
                 //    dotWalkField = "products";
                    let productVariationResponse =   await request(backEndGraphQLURL, productVariationQuery, productVariationVariables);
                 //   console.log({response});
                 setProductVariations(productVariationResponse.productVariation);
                

     let temp = productVariationResponse.productVariation.map( (obj) => {
       let newObj = {};
       
       newObj.id = obj.id;
       newObj.color = obj.color;
       newObj.img = obj.img;
       newObj.quantity = obj.quantity
       // newObj.user = `${obj.user.email}`;
       return newObj;
    })

    productVariationResponse.productVariation =  temp;
    setRows(temp);

        console.log({temp});

            }
            catch(err){
                console.log(err.message);
            }
        }

        fetchData();
    }, [productId])


    return (
        <div className="productAdmin">
            <Sidebar />
            <div className="productContainer2">
                <Navbar />
                <div className="orders">
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                   <div className="order">
                       <div className="left">
                            <div className="user">
                                <div className="userImg">
                                    <img src={avatarImg} alt="" />
                                </div>
                                <div className="userInfo">
                                    <div className="userInfoItem">
                                        {/* <span>id:</span> */}
                                        <span>yohanes@g.com</span>
                                    </div>
                                    <div className="userInfoItem">
                                        {/* <span>Full Name:</span> */}
                                        <span>Yohanes Debebe</span>
                                    </div>
                                </div>
                            </div>

                       </div>
                       <div className="right">
                            <div className="orderInfo">
                                    <div className="orderInfoItem">
                                        <span>Total Products:</span>
                                        <span>5</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Total Price:</span>
                                        <span>26,0000</span>
                                    </div>
                                    <div className="orderInfoItem">
                                        <span>Date:</span>
                                        <span>10/Nov/2023</span>
                                    </div>
                            </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default Product;