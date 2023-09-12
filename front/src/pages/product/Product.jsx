import React from 'react'


import "./product.scss"
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/announcements/Announcement'
import NewsLetter from '../../components/newsLetter/NewsLetter'
import Footer from '../../components/footer/Footer'

import "./product.scss"
import { Add, Remove } from '@mui/icons-material'

export default function Product() {
  return (
    <div className='productPageContainer'>
        <Navbar />
        <Announcement />
        <div className="wrapper">
            <div className="imgContainer">
                <img src="https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="" />
            </div>
            <div className="infoContainer">
                <h1 className="title">Denim Jumpsuit</h1>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt excepturi dicta, cumque molestias nisi hic? Voluptatibus, repudiandae aut unde saepe amet expedita iusto quod aperiam dolores numquam aliquid corporis perspiciatis.</p>
                <span className="price">$ 20</span>
                <div className="filterContainer">
                    <div className="filter">
                        <span className="filterTitle">Color</span>
                        <div className="filterColor" style={{backgroundColor: "black"}}></div>
                        <div className="filterColor" style={{backgroundColor: "darkblue"}}></div>
                        <div className="filterColor" style={{backgroundColor: "gray"}}></div>    
                    </div>
                    <div className="filter">
                        <span className="filterTitle">Size</span>
                        <select name="" id="">
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                </div>

                <div className="addContainer">
                    <div className="amountContainer">
                        <Remove />
                        <span className="amount">1</span>
                        <Add />
                    </div>
                    <button>ADD TO CART</button>
                </div>
            </div>
        </div>
        <NewsLetter />
        <Footer />
    </div>
  )
}
