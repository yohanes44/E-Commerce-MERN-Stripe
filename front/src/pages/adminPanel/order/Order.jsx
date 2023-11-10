
import React, {useState, useEffect} from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import SalesPerformance from '../../../components/salesPerformance/salesPerformance';


import { useLocation, useNavigate } from 'react-router-dom';


import "./order.scss"

import joImg from "../../../images/category/shirt5.jpg"

import Chart from "../../../components/chart/Chart"

import {Publish, DriveFolderUploadOutlined} from '@mui/icons-material';
import Datatable from '../../../components/admin/datatable/Datatable';



import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import  backEndGraphQLURL from '../../../utility/http';


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

    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);


  

    const productId = parseInt(location.pathname.split("/")[3]);


    // useEffect(()=>{
   
    //     let fetchData = async () => {
    //         try{

    //             let  query = null;
    //             let variables = null;
    //             let dotWalkField = null;

    //                 query = gql`
    //                 query product($id: Int!) {
    //                     product(id: $id) {
    //                            id, 
    //                            name,
    //                            desc,
    //                            img,
    //                            brand,
    //                            isActive,
    //                            price,
    //                            variation{
    //                             id,
    //                             color,
    //                             size
    //                            },
    //                            category{
    //                             id,
    //                             name
    //                            }

    //                 }}
    //               `;

    //                variables = { id: productId }; // Define your variable object
    //                dotWalkField = "products";
    //                let response =   await request(backEndGraphQLURL, query, variables);
    //             console.log({response});
    //                setProduct(response.product);

    //         }
    //         catch(err){
    //             console.log(err.message);
    //         }
    //     }

    //     fetchData();
    // }, [productId])
    return (
        <div className="productAdmin">
            <Sidebar />
            <div className="productContainer2">
                <Navbar />
                <div className="product">

                    <Datatable headers={headers} rows={rows} title="orders"/>
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
                </div>
            </div>
        </div>
    );
}

export default Order;