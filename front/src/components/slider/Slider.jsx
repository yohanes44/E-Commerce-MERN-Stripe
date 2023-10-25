

import "./slider.scss";

import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';


import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Link
} from "react-router-dom"

export default function Slider() {

  const [sliderItem, setSliderItem] = useState(0)

const sliderItems = [
  {
    id: 0,
    img: "http://localhost:3005/api/image/product/cover2.jpg",
    title: "Huge Discount",
    category: "shoes",
    desc: "DON'T COMPROMISE  ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS."
  },
  {
    id: 1,
    img: "http://localhost:3005/api/image/category/shoes4.jpg",
    title: "Shoes",
    category: "shoes",
    desc: "Showcase the latest footwear trends, from sneakers to high heels, for the fashion-forward shopper."
  },
  {
    id: 2,
    img: "http://localhost:3005/api/image/category/mobile10.jpg",
    title: "Electornics",
    category: "mobile",
    desc: "Explore cutting-edge gadgets and technology, including smartphones and laptops."
  }
]

const handleClickCarousel = (direction)=>{

  let newSliderNum;

  if(direction ===  "left"){
    console.log("direction ===  left, ");
    // setSliderItem(sliderItem > 0? sliderItem - 1: 2);
  
    newSliderNum = (currentSlide == 0) ? 2 : currentSlide - 1;
    // setSliderItem(1)
    setCurrentSlide(newSliderNum)
  }
  if(direction === "right"){
    // setSliderItem(sliderItem < 2? sliderItem + 1: 0);
    console.log("direction ===  right");
    newSliderNum = (currentSlide == 2) ? 0 : currentSlide + 1;

    setCurrentSlide(newSliderNum)
    // setSliderItem(2)
  }
}

const [currentSlide, setCurrentSlide] = useState(0);



  return (
    <div className="sliderContainer">
      <div className="arrow left" onClick={()=>handleClickCarousel("left")}>
        <KeyboardArrowLeftOutlined />
      </div>
      <div className="wrapper" style={{
            transform:  `translateX(${sliderItem} * -100vw)`
      }}>
        

        <div className="slide">
          <div className="imgContainer">
            <img src={sliderItems[currentSlide].img} alt="img" />
          </div>
          <div className="infoContainer">
           
            <h1 className="title">{sliderItems[currentSlide].title}</h1>
            <p className="desc">{sliderItems[currentSlide].desc}</p>
            <Link to={`products/${sliderItems[currentSlide].category}`}>
                <button>SHOP NOW</button>
            </Link>
          </div>
        </div>


        {/* {
          sliderItems.map((item, index) => (

        <div className={`slide ${currentSlide == index ? 'jo' : ''}`} index={index} >
          <div className="imgContainer">
            <img src={item.img} alt="img" />
          </div>
          <h1>{index}</h1>
          <div className="infoContainer">
            <h1 className="title">{item.title}</h1>
            <p className="desc">{item.desc}</p>
            <button>SHOW NOW</button>
          </div>

        </div>
          ))
        } */}
       
   
      </div>
      <div className="arrow right" onClick={()=>handleClickCarousel("right")}>
        <KeyboardArrowRightOutlined />
      </div>
    </div>
  )
}

