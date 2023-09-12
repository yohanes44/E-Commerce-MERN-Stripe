import React from 'react'


import "./cart.scss"
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/announcements/Announcement'
import Footer from '../../components/footer/Footer'
import { Add, Remove } from '@mui/icons-material'

export default function Cart() {
  return (
    <div className='cartContainer'>
        <Navbar />
        <Announcement />
        <div className="wrapper">
            <h1 className="title">YOUR BAG</h1>
            <div className="top">
                <button style={{backgroundColor: "transparent"}} className="topButton">CONTINUE SHOPING</button>
                <div className="topTexts">
                    <span className="topText">Shopping Bag(2)</span>
                    <span className="topText">Your Wishlist (0)</span>
                </div>
                <button style={{backgroundColor: "black", color: "white", border: "none"}} className="topButton">CHECKOUT NOW</button>
            </div>
            <div className="bottom">
                <div className="info">
                    <div className="product">
                        <div className="productDetail">
                            <img src="https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="" />
                            <div className="details">
                                <span className="productName"><b>Product:</b> JESSIE THUNDER SHOES</span>
                                <span className="productId"><b>ID:</b> 32434222324342234423</span>
                                <span className="productColor"></span>
                                <span className="productSize"><b>Size:</b> 37.5</span>
                            </div>
                        </div>
                        <div className="priceDetail">
                            <div className="productAmountContainer">
                                <Add />
                                <div className="productAmount">2</div>
                                <Remove />
                            </div>
                            <div className="productPrice">$ 30</div>
                        </div>
                    </div>
                    <hr />
                    <div className="product">
                        <div className="productDetail">
                            <img src="https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="" />
                            <div className="details">
                                <span className="productName"><b>Product:</b> JESSIE THUNDER SHOES</span>
                                <span className="productId"><b>ID:</b> 32434222324342234423</span>
                                <span className="productColor"></span>
                                <span className="productSize"><b>Size:</b> 37.5</span>
                            </div>
                        </div>
                        <div className="priceDetail">
                            <div className="productAmountContainer">
                                <Add />
                                <div className="productAmount">2</div>
                                <Remove />
                            </div>
                            <div className="productPrice">$ 30</div>
                        </div>
                    </div>
                </div>
                <div className="summary">
                    <h1 className="summaryTitle">ORDER SUMMARY</h1>
                    <div className="summaryItem">
                        <span className="summaryItemText">Subtotal</span>
                        <span className="summaryItemPrice">$ 80</span>
                    </div>
                    <div className="summaryItem">
                        <span className="summaryItemText">Estimated Shipping</span>
                        <span className="summaryItemPrice">$ 5.90</span>
                    </div>
                    <div className="summaryItem">
                        <span className="summaryItemText">Shipping Discount</span>
                        <span className="summaryItemPrice">$ -5.90</span>
                    </div>
                    <div className="summaryItem" style={{fontWeight: 500, fontSize: 24}} >
                        <span className="summaryItemText" >Total</span>
                        <span className="summaryItemPrice">$ 80</span>
                    </div>
                    <button>CHECKOUT NOW</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
