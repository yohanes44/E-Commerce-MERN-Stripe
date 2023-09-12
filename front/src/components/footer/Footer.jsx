import React from 'react'


import "./footer.scss"
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'

export default function Footer() {
  return (
    <div className='footerContainer'>
        <div className="left">
            <h1 className="logo">
                Yohanes Debebe
            </h1>
            <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, fugit dolorum? Voluptatibus ipsam provident dolore ut totam quam pariatur dolorem nobis enim, illum molestias, laudantium quaerat quisquam quae labore! Veritatis?
            </p>
            <div className="socialContainer">
                <div className="socialIcon">
                    <Facebook />
                </div>
                <div className="socialIcon">
                    <Instagram />
                </div>
                <div className="socialIcon">
                    <Twitter />
                </div>
                <div className="socialIcon">
                    <Pinterest />
                </div>
            </div>
        </div>
        <div className="center">
            <h3 className="title">Useful Links</h3>
            <ul className="list">
                <li className="listItem">Home</li>
                <li className="listItem">Cart</li>
                <li className="listItem">Man Fashion</li>
                <li className="listItem">Woman Fashion</li>
                <li className="listItem">Accessories</li>
                <li className="listItem">My Account</li>
                <li className="listItem">Order Tracking</li>
                <li className="listItem">Wishlist</li>
                <li className="listItem">Terms</li>
            </ul>
        </div>
        <div className="right">
            <h3 className="title">Contact</h3>
            <div className="contactItem">
                <Room style={{marginRight: "10px"}}/> Bole, Addis Ababa, Ethiopia
            </div>
            <div className="contactItem">
                <Phone style={{marginRight: "10px"}}/> +251967584032
            </div>
            <div className="contactItem">
                <MailOutline style={{marginRight: "10px"}} /> yohanesdebebe44@gmail.com
            </div>
            <img  className="paymentImg" src="https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="footerImg"  />
        </div>
    </div>
  )
}
