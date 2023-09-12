

import "./slider.scss";

import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';


import React, { useState } from 'react'

export default function Slider() {

  const [sliderItem, setSliderItem] = useState(2)

const sliderItems = [
  {
    id: 1,
    img: "https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k",
    title: "Summer Sale",
    desc: "DON'T COMPROMISE  ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS."
  },
  {
    id: 2,
    img: "https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k",
    title: "Winter Sale",
    desc: "DON'T COMPROMISE  ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS."
  },
  {
    id: 3,
    img: "https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k",
    title: "Autumn Sale",
    desc: "DON'T COMPROMISE  ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS."
  }
]

const handleClick = (direction)=>{
  if(direction ===  "left"){
    setSliderItem(sliderItem > 0? sliderItem - 1: 2);
  }
  if(direction === "right"){
    setSliderItem(sliderItem < 2? sliderItem + 1: 0);
  }
}


  return (
    <div className="sliderContainer">
      <div className="arrow left" onClick={()=>handleClick("left")}>
        <KeyboardArrowLeftOutlined />
      </div>
      <div className="wrapper" style={{
            transform:  `translateX(${sliderItem} * -100vw)`
      }}>
        <div className="slide">
          <div className="imgContainer">
            <img src="https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="img" />
          </div>
          <div className="infoContainer">
            <h1 className="title">SUMMER SALE</h1>
            <p className="desc">DON'T COMPROMISE  ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
            <button>SHOW NOW</button>
          </div>

        </div>

        {
          sliderItems.map((item, i) => (

        <div className="slide">
          <div className="imgContainer">
            <img src={item.img} alt="img" />
          </div>
          <div className="infoContainer">
            <h1 className="title">{item.title}</h1>
            <p className="desc">{item.desc}</p>
            <button>SHOW NOW</button>
          </div>

        </div>
          ))
        }
        <div className="slide">
          <div className="imgContainer">
            <img src="https://fastly.picsum.photos/id/699/200/300.jpg?hmac=s68cvOJXxl4ZvaOM6PpveL8klBiaViC9Nbi02oETt5k" alt="img" />
          </div>
          <div className="infoContainer">
            <h1 className="title">POPULAR SALE</h1>
            <p className="desc">DON'T COMPROMISE  ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
            <button>SHOW NOW</button>
          </div>

        </div>
       
      </div>
      <div className="arrow right" onClick={()=>handleClick("right")}>
        <KeyboardArrowRightOutlined />
      </div>
    </div>
  )
}

