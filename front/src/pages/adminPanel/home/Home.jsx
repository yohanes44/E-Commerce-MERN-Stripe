import React from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import "./home.scss"
import Widget from '../../../components/admin/widget/Widget';
import Featured from '../../../components/admin/featured/Featured';
import Chart from '../../../components/admin/chart/Chart';
import List from '../../../components/admin/table/Table';

function HomeAdmin() {
    return (
        <div className="home">
           <Sidebar/>
           <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user"/>
                    <Widget type="order"/>
                    <Widget type="earning"/>
                    <Widget type="balance"/>
                </div>
                <div className="charts">
                    <Featured />
                    <Chart  aspect={2/1} title="Last 6 months (Revenue)" />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <List />
                </div>
           </div>
        </div>
    );
}

export default HomeAdmin;