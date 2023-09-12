import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import {KeyboardArrowDownIcon} from "@mui/icons-material"


import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="left">
          
          {/* <div className="item">
            <img src="" alt="itemImg" /> 
            <KeyboardArrowDown/> 
          </div> */}

          <span>EN</span>
          <div className="searchContainer">
            <input type="text" className="searchInput"></input>
            <SearchIcon  className="searchIcon"/>
          </div>

        </div>
        <div className="center">
          <div className="logo">ቱባዉ E-Commerce</div>
        </div>
        <div className="right">
          <div className="themeContainer">
            <div className="black"></div>
            <div className="white"></div>
          </div>
          <div className="menuItem">Register</div>
          <div className="menuItem">Sign in</div>
          <div className="menuItem">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
