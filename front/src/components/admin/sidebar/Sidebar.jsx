import React from "react";

import "./sidebar.scss";

import {
  Dashboard,
  PersonOutline,
  Store,
  CreditCard,
  LocalShipping,
  InsertChart,
  NotificationsNone,
  SettingsSystemDaydreamOutlined,
  PsychologyOutlined,
  SettingsApplications,
  AccountCircleOutlined,
  ExitToApp,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useDarkMode } from "../../../utility/context/darkMode"


function Sidebar() {

  const {darkMode, setDarkMode} = useDarkMode();

  return (
    <div className="sidebar" >
      <div className="wrapper">
        <div className="top">
          <Link to="/adminPanel" style={{textDecoration: "none"}}>
          <div className="logo">Admin Panel</div>
        
          </Link>
          </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">Main</p>
            <Link style={{textDecoration: "none"}}>
              <li>
                <Dashboard className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>

            <p className="title">Lists</p>
            <Link to="/adminPanel/users" style={{textDecoration: "none"}}>
              <li>
                <PersonOutline className="icon" />
                <span>Users</span>
              </li>
            </Link>

            <Link to="/adminPanel/products" style={{textDecoration: "none"}}>
              <li>
                <Store className="icon" />
                <span>Products</span>
              </li>
            </Link>
            <Link to="/adminPanel/orders"  style={{textDecoration: "none"}}>
              <li>
                <CreditCard className="icon" />
                <span>Orders</span>
              </li>
            </Link>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <LocalShipping className="icon" />
                <span>Delivery</span>
              </li>
            </Link>

            {/* <p className="title">Useful</p>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <InsertChart className="icon" />
                <span>Stats</span>
              </li>
            </Link>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <NotificationsNone className="icon" />
                <span>Notifications</span>
              </li>
            </Link> */}


            {/* <p className="title">Services</p>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <SettingsSystemDaydreamOutlined className="icon" />
                <span>System Health</span>
              </li>
            </Link>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <PsychologyOutlined className="icon" />
                <span>Logs</span>
              </li>
            </Link>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <SettingsApplications className="icon" />
                <span>Settings</span>
              </li>
            </Link> */}


            <p className="title">User</p>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <AccountCircleOutlined className="icon" />
                <span>Profile</span>
              </li>
            </Link>
            <Link  style={{textDecoration: "none"}}>
              <li>
                <ExitToApp className="icon" />
                <span>Logout</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="bottom">
          <div onClick={(e) => {setDarkMode(false)}} className="bottomOption"></div>
          <div onClick={(e) => {setDarkMode(true)}} className="bottomOption"></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
