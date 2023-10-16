import React from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import "./home.scss"
import Widget from '../../../components/admin/widget/Widget';
import Featured from '../../../components/admin/featured/Featured';
import Chart from '../../../components/admin/chart/Chart';
import List from '../../../components/admin/table/Table';

import NewJoinMembers from '../../../components/admin/newJoinMembers/NewJoinMembers';
import LatestTransaction from '../../../components/admin/latestTrabsactions/latestTransactions';

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
                    {/* <Featured /> */}
                    <Chart  aspect={4/1} title="User Analytics"
                     data={
                        [
                            {name: "January", Total: 100},
                            {name: "February", Total: 1200},
                            {name: "March", Total: 500},
                            {name: "April", Total: 800},
                            {name: "May", Total: 600},
                            {name: "June", Total: 400}
                           ]
                    } />
                </div>


                <div className="latestSummary">
                    <NewJoinMembers/>
                    <div className="list">
                      <div className="listTitle">Latest Orders</div>
                        <List />
                    </div>
                </div>

             
           </div>
        </div>
    );
}

export default HomeAdmin;