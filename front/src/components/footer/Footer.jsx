import React from 'react'


import "./footer.scss"
import { Facebook, Instagram, LinkedIn, GitHub, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'

import {
    Link
  } from "react-router-dom"

  
export default function Footer() {
  return (
    <div className='footerContainer'>
        <div className="left">
            {/* <h1 className="logo">
                Yohanes Debebe
            </h1> */}
            <span className="title" style={{
                padding: "20px"
            }}>
                <span>Powered By:</span> <b style={{

                }}> Yohanes Debebe  </b> 
            </span>
            <div className="socialContainer">
                <div className="socialIcon">
                <a href="https://www.linkedin.com/in/yohanes-debebe-76024a209/" target="_blank" rel="noopener noreferrer">
  <LinkedIn style={{
    color: "white"
  }} />
</a>

                </div>
                <div className="socialIcon">
                <a href="https://github.com/yohanes44" target="_blank" rel="noopener noreferrer">
  <GitHub style={{
    color: "white"
  }} />
</a>
 
                </div>
                {/* <div className="socialIcon">
                    <Twitter />
                </div>
                <div className="socialIcon">
                    <Pinterest />
                </div> */}
            </div>
        </div>
        <div className="center">
            <h3 className="title">Useful Links</h3>
            <ul className="list">
                <li className="listItem">
                    <Link to="/">
                        Home
                    </Link>
                    </li>
                <li className="listItem">  <Link to="/cart">
                        Cart
                    </Link></li>
                <li className="listItem">  <Link to="/products/shirt">
                        Shirt
                    </Link></li>
                <li className="listItem"> <Link to="/products/shoes">
                        Shoes
                    </Link></li>
                <li className="listItem"><Link to="/products/mobile">Accessories</Link></li>
                <li className="listItem"><Link to="/register">Be our member</Link></li>

                
                {/* <li className="listItem">My Account</li> */}
                {/* <li className="listItem">Order Tracking</li> */}
                {/* <li className="listItem">Wishlist</li> */}
                {/* <li className="listItem">Terms</li>  */}
            </ul>
        </div>
        <div className="payment">
                <h3>Pay With</h3>
                <img  className="paymentImg" src="http://localhost:3005/api/image/product/chapa.jpg" alt="footerImg"  />
            </div>

        <div className="right">
            <h3 className="title">Developer Contact</h3>
            <div className="contactItem">
                <Room style={{marginRight: "10px"}}/> Bole, Addis Ababa, Ethiopia
            </div>
            <div className="contactItem">
                <Phone style={{marginRight: "10px"}}/> +251967584032
            </div>
            <div className="contactItem">
                <MailOutline style={{marginRight: "10px"}} /> yohanesdebebe44@gmail.com
            </div>
           
        </div>
    </div>
  )
}
