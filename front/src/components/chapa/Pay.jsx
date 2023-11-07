

import "./pay.scss"

import React, {useState, useEffect} from 'react'

import { useLocation, useNavigate } from 'react-router-dom';

import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import  backEndGraphQLURL from '../../utility/http';

// import "./cart.scss"
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/announcements/Announcement'
import Footer from '../../components/footer/Footer'
import { Add, Remove } from '@mui/icons-material'

import { useAuth } from "../../utility/context/auth";
import { useCart } from "../../utility/context/cart";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// import Pay from "../../components/chapa/Pay";



export default function Pay({ setCheckOutOpen, firstName, lastName, email, amount }) {

    
    const {isAuthenticated, setAuthenticated, login, setToken, user} = useAuth();
    const {cartItems, setCartItems, addOrder, findCartItems, cancelCartItem, updateCartItemQuantity} = useCart();


    function submit(){
        // setTimeout(() =>{
            // addOrder(user.id);
        // },1000 )  
    }

    return (
        <div className="checkout">

       
        <div className="summaryChapa">
            <div onClick={
                (e) => {
                    setCheckOutOpen(false);
                }
            } style={{
                position: "absolute",
                alignSelf: "flex-end",
                marginRight: "-25px",
                marginTop: "-150px",
                // border: "2px solid black"
            }}>
                <CancelOutlinedIcon  style={{
                    color: "red"
                }}/>
            </div>
            <h1 style={{
                justifySelf: "flexStart",
                // border: "2px solid red"
            }}>Pay With</h1>
                   
     <form method="POST" action="https://api.chapa.co/v1/hosted/pay" onSubmit={(e) => submit()}>
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-f8mLsqVcg8uHJkM4rVTePiZCaiwWZPCh" />
        <input type="hidden" name="tx_ref" value={`${firstName}-${lastName}-tx-${Date.now()}`} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={firstName} />
        <input type="hidden" name="last_name" value={lastName} />
        <input type="hidden" name="title" value="Let us do this" />
        <input type="hidden" name="description" value="Paying with Confidence with cha" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value={`http://localhost:3005/api/payment/chapa/verify/trx?userId=${user.id}`} />
        <input type="hidden" name="return_url" value="http://localhost:3000/cart" />
        <input type="hidden" name="meta[title]" value="test" />
        <button type="submit"><img src="http://localhost:3005/api/image/product/chapa.jpg" alt="" /></button>
    </form>
    </div>
    </div>
  )
}

