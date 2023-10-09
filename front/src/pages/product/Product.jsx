import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { request, gql } from "graphql-request"; // Import necessary functions and objects

import backEndGraphQLURL from "../../utility/http";

import "./product.scss";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/announcements/Announcement";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import Footer from "../../components/footer/Footer";

import "./product.scss";
import { Add, Remove } from "@mui/icons-material";

import { useAuth } from "../../utility/context/auth";

export default function Product() {

  
  const {isAuthenticated, setAuthenticated, login, setToken, user} = useAuth();

  
  const location = useLocation();
  const id = parseInt(location.pathname.split("/")[2]);

  const [product, setProduct] = useState({
    id: 0, // Initialize with appropriate default values for other properties
    name: "",
    desc: "",
    img: "",
    brand: "",
    color: [
      {
        color: "red",
        quantity: 5,
      },
      {
        color: "blue",
        quantity: 7,
      },
    ],
    size: "",
    price: 0,
    isActive: false,
    quantity: 0,
  });

  const [cartItem, setCartItem] = useState({});

  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  

  const [sizes, setSizes] =  useState(["XS", "S", "M", "L", "XL"]);

  const [size, setSize] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmPopUp, setConfirmPopUp] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productQuery = gql`
          query GetProduct($id: Int!) {
            product(id: $id) {
              id
              name
              desc
              img
              brand
              color
              size
              price
              isActive
              quantity
            }
          }
        `;

        const variables = { id: parseInt(id) }; // Define your variable object

        let responseProduct = await request(
          backEndGraphQLURL,
          productQuery,
          variables
        );

        // let temp = responseProduct.product;
        responseProduct.product.color = JSON.parse(
          responseProduct.product.color
        );

        setProduct(responseProduct.product);

        console.log("product color", product.color[1].color);

        setLoading(false);

        //jo

        //jo
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, quantity]);

  const addToCart = async (e) => {

    const userId = parseInt(user.id);
    const productId = id;

    try {
      const addToCartMutation = gql`
      mutation addCartItem($userId: Int!, $productId: Int!, $quantity: Int!) {
        addCartItem(userId: $userId, productId: $productId, quantity: $quantity) {
          userId
          productId
        }
      }
    `;
      const variables = { userId, productId, quantity};

      let responseAddCartItem = await request(backEndGraphQLURL,addToCartMutation,variables);
      setCartItem( responseAddCartItem.addCartItem);
      setConfirmPopUp(true);

      setLoading(false);
    } catch (err) {
      console.log(err)
      setError(err);  
      setLoading(false);
    }
  };
  
  const handleQuantity = (operation) => {    
    setQuantity((state) => {
      if (operation === 'add') {
        return state + 1; // Increment by 1 for 'add' operation
      }
      if (operation === 'minus') {
        return state - 1; // Decrement by 1 for 'minus' operation
      }
    });
  };


  return (
    <div className="productPageContainer">
      <Navbar />
      <Announcement />
      <div className="wrapper">
        <div className="imgContainer">
          <img src={product.img} alt="" />
        </div>
        <div className="infoContainer">
          <h1 className="title">{product.name}</h1>
          <p className="desc">{product.desc}</p>
          <span className="price">Birr {product.price * quantity}</span>
          <div className="filterContainer">
            <div className="filter">
              <span
                className="filterTitle"
                style={{ color: color, fontWeight: "bolder" }}
              >
                Color
              </span>
              {product.color.map((color) => {
                return (
                  <div
                    onClick={() => {
                      setColor(color.color);
                    }}
                    className="filterColor"
                    style={{ backgroundColor: `${color.color}` }}
                  ></div>
                );
              })}
            </div>
            <div className="filter">
              <span className="filterTitle">Size</span>
              <select name="" id="">
                {
                  sizes.map((size)=>{
                    return <option value={size}>{size}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="addContainer">
            <div className="amountContainer">
              <Remove  disabled={quantity < 2} onClick={(e) => {
                  if(quantity > 1) return handleQuantity("minus")
                  }
                } />
              <span className="amount">{quantity}</span>
              <Add disabled={quantity > 10}  onClick={(e)=>{
                  if(quantity < 10) return handleQuantity("add")
              }} />
            </div>
            <button onClick={addToCart}>ADD TO CART</button>
           
          </div>
          { confirmPopUp ?
          <div className="popUpContainer">
              <div className="productDetail">
                 <h1 style={{color: "green"}} className="confirmText">{`${product.name} Added to Cart Succesfuly`}</h1>
              </div>
          </div>: null
          }
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}
