import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useAuth } from "../../utility/context/auth";

import { useCart } from "../../utility/context/cart";


import {
  Link
} from "react-router-dom"

import "./navbar.scss";
import { useNavigate } from "react-router";



export default function Navbar() {

  const {isAuthenticated, logOut, setAuthenticated, login, setToken, user, setUser} = useAuth();
  const {totalCart} = useCart();


  return (
   
  //  <div>
  //   Nav Bar Test
  //  </div>
    <div className="navbar">
      <div className="navbarContainer">
        <div className="left">
          
          {/* <div className="item">
            <img src="" alt="itemImg" /> 
            <KeyboardArrowDown/> 
          </div> */}

        <Link to="/" style={{
          textDecoration: "none"
        }}>
           <div className="logo">ቱባዉ E-Commerce</div>
         </Link>

        </div>
        <div className="center">
    
         {/* <span>EN</span> */}
          {/* <div className="searchContainer">
            <input type="text" className="searchInput"></input>
            <SearchIcon  className="searchIcon"/>
          </div> */}
        </div>
        <div className="right">
          <div className="themeContainer">
            <div className="black"></div>
            <div className="white"></div>
          </div>
          
          {/* <Link to={`/products/${item.name}`}>
              <button>SHOP NOW</button>
          </Link> */}

            { (isAuthenticated === false) ?
                <>
                  <Link to="/register" style={{
                    textDecoration: "none"
                  }}>
                  <div className="menuItem">Register</div>
                </Link>
                <Link to="/login" style={{
                    textDecoration: "none"
                  }}>
                <div className="menuItem">Sign in</div>
              </Link> 
              
                </>
                : <>
                    <Link to="/cart">
              <div className="menuItem">
                <Badge badgeContent={totalCart} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </div>
            </Link>
                 <div className="menuItem" onClick={(e)=> logOut()}>Logout</div> 
                </>  
           }
            {/* { (isAuthenticated === false) ?
              <Link to="/login">
                <div className="menuItem">Sign in</div>
              </Link> 
              : null
            }
            { (isAuthenticated === false) ?
              <Link to="/cart">
              <div className="menuItem">
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </div>
            </Link> 
              : null
            } */}
        
        </div>
      </div>
    </div>
  );
}
