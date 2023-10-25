import React, {useState, useEffect} from 'react'

import { useLocation, useNavigate } from 'react-router-dom';

import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import  backEndGraphQLURL from '../../utility/http';

import "./cart.scss"
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/announcements/Announcement'
import Footer from '../../components/footer/Footer'
import { Add, Remove } from '@mui/icons-material'

import { useAuth } from "../../utility/context/auth";
import { useCart } from "../../utility/context/cart";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function Cart() {



     const [shippingCost, setShippingCost] = useState(5.90);
     const [shippingDiscount, setShippingDiscount] = useState(-5.90);


    const {isAuthenticated, setAuthenticated, login, setToken, user} = useAuth();
    const {cartItems, setCartItems, findCartItems, cancelCartItem, updateCartItemQuantity} = useCart();


  

    const navigate = useNavigate();



    if(isAuthenticated === false){
      navigate('/login');
    }
    
  

    // useEffect(() => {

    //   console.log("Cart, user");
    //   console.log(user);

      
    //   const userId = parseInt(user.id);

    //     const fetchData = async () => {
    //       try {
    //         const productQuery = gql`
    //           query GetCartItems($userId: Int!) {
    //             cartItems(userId: $userId) {
    //               id
    //               userId
    //               productId
    //               state
    //               quantity
    //               product{
    //                 id
    //                 name
    //                 img
    //                 color
    //                 quantity
    //                 price
    //               }
    //             }
    //           }
    //         `;
    
    //         const variables = { userId: userId }; // Define your variable object
    
    //         let responseProduct = await request(
    //           backEndGraphQLURL,
    //           productQuery,
    //           variables
    //         );
  
    //         setCartItems(responseProduct.cartItems);
    
    //         console.log("responseProduct.cartItems", responseProduct.cartItems);
    
    //         // setLoading(false);
    
    //         //jo
    
    //         //jo
    //       } catch (err) {
    //         console.log(err);
    //         // setError(err);
    //         // setLoading(false);
    //       }
    //     };
    
    //     fetchData();
    //   }, [user.id]);
 
      const handleChangeQuantity = (cartItemId, currentQuantity, operation) =>{
        updateCartItemQuantity(parseInt(cartItemId), currentQuantity, operation);
      }

      const handleCancel = (id) => {
        cancelCartItem(parseInt(id));
      }

      const  calculateTotalCart = () => {
        let totalPrice = 0;
        cartItems.map( cartItem => {
            return totalPrice += cartItem.quantity * cartItem.product.price;
        })
        return totalPrice;
      }
    
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
                  {
                    cartItems.map((cartItem)=>{
                        return (
                            
                            <div>
                                  <hr />
                        <div className="product">
                        <div className="productDetail">
                            <img src={cartItem.product.img} alt="" />
                            <div className="details">
                                <span className="productName"><b>Product:</b>  {cartItem.product.name}</span>
                                <span className="productId"><b>ID:</b>  {cartItem.id}</span>
                                <span className="productColor"></span>
                                <span className="productSize"><b>Size:</b> </span>
                            </div>
                        </div>
                        
                        <div className="priceDetail">
                         <div className="productAmountContainer">
                                <Add disabled={cartItem.quantity > 10} onClick={ (e)=> {
                                    if(cartItem.quantity < 10 ){
                                        return handleChangeQuantity(cartItem.id, cartItem.quantity, "add") 
                                    }
                                }}/>
                                <div className="productAmount"> {cartItem.quantity}</div>
                                <Remove disabled={cartItem.quantity < 2} onClick={ (e)=>{
                                    if(cartItem.quantity > 1 ){
                                        return handleChangeQuantity(cartItem.id, cartItem.quantity, "minus") 
                                    }
                                  }
                                }/>
                                
                            </div>
                            <div className="productPrice">$  {cartItem.quantity * cartItem.product.price}</div>
                        </div>

                        <div className="cancelOperation" onClick={(e)=> handleCancel(cartItem.id)}>
                            {/* <CancelOutlinedIcon /> */}
                            cancel
                        </div>
                    </div>
                  
      
                            </div>
                        )
                    })
                  }
                  
                </div>
                <div className="summary">
                    <h1 className="summaryTitle">ORDER SUMMARY</h1>
                    <div className="summaryItem">
                        <span className="summaryItemText">Subtotal</span>
                        <span className="summaryItemPrice">{
                             `$` + calculateTotalCart()
                        }</span>
                    </div>
                    <div className="summaryItem">
                        <span className="summaryItemText">Estimated Shipping</span>
                        <span className="summaryItemPrice">{`$` + shippingCost}</span>
                    </div>
                    <div className="summaryItem">
                        <span className="summaryItemText">Shipping Discount</span>
                        <span className="summaryItemPrice">{`$` + shippingDiscount}</span>
                    </div>
                    <div className="summaryItem" style={{fontWeight: 500, fontSize: 24}} >
                        <span className="summaryItemText" >Total</span>
                        <span className="summaryItemPrice"> $ { calculateTotalCart() + shippingCost + shippingDiscount}</span>
                    </div>
                    <button>CHECKOUT NOW</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
