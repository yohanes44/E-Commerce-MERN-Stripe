import React, { useEffect, createContext, useContext, useState } from "react";

import { Navigate, useNavigate } from "react-router";
import { request, gql } from "graphql-request"; // Import necessary functions and objects
import backEndGraphQLURL from "../../utility/http";

import { useAuth } from "./auth";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export default function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(null);
  const [totalCart, setTotalCart] = useState(0);


  const { isAuthenticated, setAuthenticated, login, setToken, user } =
    useAuth();

  

  useEffect(() => {
    try {
      if (isAuthenticated) {
         findTotalCart(user.id);
         findCartItems(user.id);
      }
    //   if (!isAuthenticated) {
    //     setTotalCart(0);
    //   }
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated, cartItems]);


  console.log("CartContext: user == ");
  console.log(user);

  const findTotalCart = async (id) => {

    console.log("CartContext: findTotalCart called");
    
    // const userId = parseInt(user.id);
    const userId = parseInt(user.id);

    console.log("CartContext: user == ");
    console.log(user);

    const findCartItemQuery = gql`
      query GetCartItems($userId: Int!) {
        cartItems(userId: $userId) {
          id
          userId
          productId
          state
          quantity
          product {
            id
            name
            img
            color
            quantity
            price
          }
        }
      }
    `;
    const variables = { userId: userId };

    let response = await request(
      backEndGraphQLURL,
      findCartItemQuery,
      variables
    );

    
    console.log("CartContext: user raphQL response == ");
    console.log(response);

    console.log("CartContext: cartItems.length raphQL response == ");
    console.log(response.cartItems.length);
  

    setTotalCart(response.cartItems.length);
  };

  
  const findCartItems = async (id) => {
    
        try {
          const productQuery = gql`
            query GetCartItems($userId: Int!) {
              cartItems(userId: $userId) {
                id
                userId
                productId
                state
                quantity
                product{
                  id
                  name
                  img
                  color
                  quantity
                  price
                }
              }
            }
          `;
  
          const variables = { userId: parseInt(user.id) }; // Define your variable object
  
          let responseProduct = await request(
            backEndGraphQLURL,
            productQuery,
            variables
          );

          setCartItems(responseProduct.cartItems);
  
          console.log("responseProduct.cartItems", responseProduct.cartItems);
  
          // setLoading(false);
  
          //jo
  
          //jo
        } catch (err) {
          console.log(err);
          // setError(err);
          // setLoading(false);
        }
  }

  const contextValue = {
    totalCart,
    cartItems, 
    setCartItems,
    findCartItems
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
