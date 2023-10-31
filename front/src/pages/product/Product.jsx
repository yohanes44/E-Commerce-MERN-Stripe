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
  const [color, setColor] = useState("");
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
         setSelectedProductVariation(
          productVariation[0]
        );
    
        // console.log(responseProductVariation.productVariation);
    
        setSizes(
          responseProductVariation.productVariation.map((pro) => {
            return pro.size;
          })
        );
        
        setColor(responseProductVariation.productVariation[0].color);
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
  },[id, quantity]);



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

  }


  const addToCart = async (e) => {
    const userId = parseInt(user.id);
    const productId = id;

    try {
      addCartItems(id, quantity);
      setConfirmPopUp(true);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  const handleQuantity = (operation) => {
    setQuantity((state) => {
      if (operation === "add") {
        return state + 1; // Increment by 1 for 'add' operation
      }
      if (operation === "minus") {
        return state - 1; // Decrement by 1 for 'minus' operation
      }
    });
  };


  const handleVariation = (variationKey, variationValue, allProductVariation) => {
   
   let variant = null;
   console.log({selectedColor: variationValue});
   if (variationKey === "color") {
     variant = allProductVariation.filter((pro) => {
       if (pro.color === variationValue) {
         return pro;
       }
     });
     setColor(variationValue);
     setProductVariation(variant);
    
     setSizes(
      variant.map((pro) => {
        return pro.size;
      })
    );

    setSize(
      variant[0].size
    );
      
    // console.log({productVariation, variant});

   }
  
  return;
  };

  const getVariant = (color, size) => {  
      let variant = productVariation.find((pro) => {
        if (pro.color === color && pro.size === size) {
          return pro;
        }
      });

      setMaxLimit(variant.quantity);
      console.log({jomaxLimit: variant.quantity});
  }

  return (
    <div className="productPageContainer">
      <Navbar />
      <Announcement />
      <div className="wrapper">
        <div className="imgContainer" style={{
          
        }}>
          <img src={  (product.img) ? product.img: "http://localhost:3005/api/image/product/productDefaultPic.png"} alt="" />
        </div>
        <div className="infoContainer">
          <h1 className="title">{product.name}</h1>
          <p className="desc">{product.desc}</p>
          <span className="price">Birr {product.price * quantity}</span>
          <h3>color: {color}, size: {size}</h3>
         
          <div className="filterContainer">
            <div className="filter">
              <span
                className="filterTitle"
                style={{ color: color, fontWeight: "bolder" }}
              >
                Color
              </span>
              {colors.map((color) => {
                return (
                  <div
                    onClick={(e) => {
                      console.log(color);
                      // setProductVariation(allProductVariation);
                      handleVariation("color", color, allProductVariation);
                      // setProductVariation(allProductVariation);
                      // setColor(color.color);
                    }}
                    className="filterColor"
                    style={{
                      backgroundColor: color,
                      border: `0.4px solid black`,
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="filter">
              <span className="filterTitle">Size</span>
              <select name="" id=""  onChange={(e) => {
                        setSize(e.target.value);
                        getVariant(color, e.target.value)
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
                disabled={quantity > maxLimit}
                onClick={(e) => {
                  if (quantity < maxLimit) return handleQuantity("add");
                }}
              />
            </div>
            <button onClick={addToCart}>ADD TO CART</button>
          </div>
          {confirmPopUp ? (
            <div className="popUpContainer">
              <div className="productDetail">
                <h1
                  style={{ color: "green" }}
                  className="confirmText"
                >{`${product.name} Added to Cart Succesfuly`}</h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}
