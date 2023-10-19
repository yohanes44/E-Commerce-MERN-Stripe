import React from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import SalesPerformance from '../../../components/salesPerformance/salesPerformance';

import "./product.scss"

import joImg from "../../../images/category/shirt5.jpg"

import Chart from "../../../components/chart/Chart"


function Product() {
    return (
        <div className="productAdmin">
            <Sidebar />
            <div className="productContainer">
                <Navbar />
                <div className="product">
                    <div className="top">
                        <div className="title">Product</div>
                        <div className="createBtn">Create</div>
                    </div>
                    <div className="center">
                        {/* <div className="chart"> */}
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
                        {/* </div> */}
                        <div className="productHighLight">
                            <div className="productTitle">
                                <img src={joImg} alt="" />
                                <div className="productNamex">Herman Coat</div>
                            </div>
                            <div className="productInfo">
                                <div className="productInfoItem">
                                    <span>id:</span>
                                    <span>3</span>
                                </div>
                                <div className="productInfoItem">
                                    <span>sales:</span>
                                    <span>513</span>
                                </div>
                                <div className="productInfoItem">
                                    <span>in stock:</span>
                                    <span>5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="productForm">
                            <label> Product Name</label>
                            <input type="text" placeholder='Product Title' />

                            <label> Product Description</label>
                            <input type="text" name="Product Desc" />

                            <label> Price</label>
                            <input type="text" name="Product title" />

                            <label> In Stock</label>
                            <select name="inStock" id="inStock">
                                <option value="true">Yes</option>
                                <option value="false">Noo</option>
                            </select>
                        </div>
                        <div className="productAction">Right</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;