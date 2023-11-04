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

import { useCart } from "../../utility/context/cart";
import { Link } from "react-router-dom";

export default function Product() {
  const { isAuthenticated, setAuthenticated, login, setToken, user } =
    useAuth();
  const { totalCart, cartItems, setCartItems, findCartItems, addCartItems } =
    useCart();

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

  const [productVariation, setProductVariation] = useState([]);
  const [allProductVariation, setAllProductVariation] = useState([]);
  const [selectedProductVariation, setSelectedProductVariation] = useState({});

  const [cartItem, setCartItem] = useState({});

  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [maxLimit, setMaxLimit] = useState(10);

  const [sizes, setSizes] = useState([]);

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

        const productVariationQuery = gql`
          query getProductVariation($id: Int!) {
            productVariation(id: $id) {
              id
              color
              img
              size
              quantity
            }
          }
        `;
        const productVariables = { id: parseInt(id) }; // Define your variable object
        const productVariationVariables = { id: parseInt(id) }; // Define your variable object

        let responseProduct = await request(
          backEndGraphQLURL,
          productQuery,
          productVariables
        );
        
        setProduct(responseProduct.product);
      
        let responseProductVariation = await request(
          backEndGraphQLURL,
          productVariationQuery,
          productVariationVariables
        );

        setProductVariation(responseProductVariation.productVariation);
        setAllProductVariation(responseProductVariation.productVariation);

        let tempColors = [];
        setColors(
          responseProductVariation.productVariation.map((pro) => {
            // console.log(pro.color );
            if (!tempColors.includes(pro.color)) {
              tempColors.push(pro.color);
              // console.log(tempColors.includes(pro.color));
              return pro.color;
            }
            // return false;
          })
        );
    
        setColors(tempColors);
         
        // setSelectedProductVariation(
        //   productVariation[0]
        // );
    
        // console.log(responseProductVariation.productVariation);
    
        setSizes(
          responseProductVariation.productVariation.map((pro) => {
            return pro.size;
          })
        );
        
        setActiveColor(responseProductVariation.productVariation[0].color);
        // console.log({CL: getColor()});
        initializeVariant(responseProductVariation.productVariation[0].color,  responseProductVariation.productVariation);
        setSize( responseProductVariation.productVariation[0].size);
        // variationHandler();
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  },[id]);



  function initializeVariant(cl, allProductVariation){
    
    console.log("initializeVariant called, CL == ", cl);

    let variant = allProductVariation.filter((pro) => {
      if (pro.color === cl) {
        return pro;
      }
    });

    
    setProductVariation(variant);
    setSizes(
      variant.map((pro) => {
        return pro.size;
      })
    );

    setMaxLimit(variant[0].quantity);
    setSelectedProductVariation(variant[0]);
  }


  const addToCart = async (e) => {

    const userId = parseInt(user.id);
    const productId = id;
    
    try {
      addCartItems(id, quantity, selectedProductVariation.id);
      setConfirmPopUp(true);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }

  };

  const handleQuantity = (operation) => {
    
    console.log("1 handleQuantity called, selectedQuantity == ", selectedProductVariation);

    setQuantity((state) => {
      if (operation === "add") {
        return state + 1; // Increment by 1 for 'add' operation
      }
      if (operation === "minus") {
        return state - 1; // Decrement by 1 for 'minus' operation
      }
    });

    console.log("2 handleQuantity called, selectedQuantity == ", selectedProductVariation);

    // setMaxLimit(maxLimit);
  };


  const handleVariation = (variationKey, variationValue, allProductVariation) => {
   
   let variant = null;
  //  console.log({selectedColor: variationValue});
   if (variationKey === "color") {
     variant = allProductVariation.filter((pro) => {
       if (pro.color === variationValue) {
         return pro;
       }
     });
     
     setActiveColor(variationValue);
     setProductVariation(variant);
    
     setSizes(
      variant.map((pro) => {
        return pro.size;
      })
    );

    setSize(
      variant[0].size
    );
    setVar(variant[0]);      
    setQuantity(1);
    // console.log({productVariation, variant});

   }
  
  return;
  };


  function setVar(variant){
    setMaxLimit(variant.quantity);
    setSelectedProductVariation(variant);
  }

  const getVariant = (color, size) => {  
      let variant = productVariation.find((pro) => {
        if (pro.color === color && pro.size === size) {
          return pro;
        }
      });
      
      setVar(variant);
      setQuantity(1);
  }

  return (
    <div className="productPageContainer">
      <Navbar />
      <Announcement />
      <div className="wrapper">
        <div className="imgContainer" style={{
          
        }}>
          <img src={ product.img || selectedProductVariation.img || "http://localhost:3005/api/image/product/productDefaultPic.png" } alt="" />
        </div>

        {
          user ? <div className="infoContainer">
          <h1 className="title">{product.name}</h1>
          <p className="desc">{product.desc}</p>
          <span className="price">Birr {product.price * quantity}</span>
          {/* <h1>{selectedProductVariation.color},  {quantity}</h1> */}
         
         
          <div className="filterContainer">
            <div className="filter">
              <span
                className="filterTitle"
                style={{ fontWeight: "bolder" }}
              >
                Color
              </span>
              {colors.map((color) => {
                return (
                  <div style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    margin: "0px 5px",
                    cursor: "pointer",
                    border: (activeColor == color) ? `2px solid ${color}`: `none`,
                    // display: "flex",
                    // justifyContent: "center",
                    padding: "2px"
                  }}>
                      <div
                    onClick={(e) => {
                      // console.log(color);
                      // setProductVariation(allProductVariation);
                      handleVariation("color", color, allProductVariation);
                      // console.log({"jo": productVariation});
                      // console.log();
                      // setProductVariation(allProductVariation);
                      // setColor(color.color);
                    }}
                    className="filterColor"
                    style={{
                      backgroundColor: color,
                      border: `0.4px solid ${color}`,
                    }}
                  ></div>
                  </div>
                );
              })}
            </div>
            <div className="filter">
              <span className="filterTitle">Size</span>
              <select name="" id=""  onChange={(e) => {
                        setSize(e.target.value);
                        // setMaxLimit
                        getVariant(activeColor, e.target.value)
                      }}>
                {sizes.map((size) => {
                  return (
                    <option
                     
                      value={size}
                    >
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="addContainer">
            <div className="amountContainer">
              <Remove
                disabled={quantity < 2}
                onClick={(e) => {
                  if (quantity > 1) return handleQuantity("minus");
                }}
              />
              <span className="amount">{quantity}</span>
              <Add
                disabled={quantity > selectedProductVariation.quantity}
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantity < selectedProductVariation.quantity) return handleQuantity("add");
                }}
              />
            </div>
            <button onClick={addToCart}>ADD TO CART</button>
            
          </div>
         
        </div>
        : <Link to="/login">
          <div style={{
          // border: "2px solid red",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start"
        }} className="infoContainer"><button 
            style={{
              backgroundColor: "teal",
              color: "white",
              border: "none",
              padding: "10px 25px",
              borderRadius: "5px"
            }}
        className="productDetail">
        Login
      </button></div>
        
          </Link> 
        }
              </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}
