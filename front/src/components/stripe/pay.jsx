import React, { useState, useEffect } from 'react'

import StripeCheckout from 'react-stripe-checkout';
import axios from "axios"

import "./pay.scss"

export default function Pay() {

    const key = "pk_test_51LwXhNFGqQ7awyAKUmUl9vqnOyHCzOfat9kWuPKGBq9N5B4j123WcjEte2FVvTDYaW7fCiut5KHe8WH8tXBou2XK00QsYdNWxT";

    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect( async ()=>{
        try{
        //    axios.post("http://localhost:3005/graphQl") 
        //    send post request to graphQL server , wuth tokenId: stripeToken, amount: 100 
        }
        catch(err){

        }
    }, [stripeToken])

  return (
    <div className='payContainer'>
        <StripeCheckout 
            name='YohanesDebebe Shop'
            billingAddress
            shippingAddress
            description='your total is 20$'
            amount={2000}
            token={onToken}
            stripeKey={key}
        >
        <button>Pay Now</button>
        
        </StripeCheckout>
    </div>
  )
}
