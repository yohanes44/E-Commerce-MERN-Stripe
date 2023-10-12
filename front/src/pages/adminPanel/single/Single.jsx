import React from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import "./single.scss"

import userImage from "./myPic.jpg"
import Chart from '../../../components/admin/chart/Chart';
import List from "../../../components/admin/table/Table"

function Single() {
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">information</h1>
                        <div className="item">
                            <img src={userImage} alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">John D</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email: </span>
                                    <span className="itemValue">john@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone: </span>
                                    <span className="itemValue">+261967584032</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address: </span>
                                    <span className="itemValue">Bole: Addis Ababa</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country: </span>
                                    <span className="itemValue">Ethiopia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3/1} title="User transaction for last 6 months" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    );
}

export default Single;