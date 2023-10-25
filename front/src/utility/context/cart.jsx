import React, { useEffect, createContext, useContext, useState } from "react";
import { request, gql } from "graphql-request";
import backEndGraphQLURL from "../../utility/http";
import { useAuth } from "./auth";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export default function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [totalCart, setTotalCart] = useState(0);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      findTotalCart(user.id);
      findCartItems(user.id);
    }
  }, [isAuthenticated, user, totalCart, cartItems]);

  const findTotalCart = async (userId) => {
    try {
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

      const variables = { userId: parseInt(userId) };
      const response = await request(backEndGraphQLURL, findCartItemQuery, variables);

      setTotalCart(response.cartItems.length);
    } catch (error) {
      console.error("Error fetching total cart:", error);
    }
  };

  const findCartItems = async (userId) => {
    try {
      const productQuery = gql`
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

      const variables = { userId: parseInt(userId) };
      const responseProduct = await request(backEndGraphQLURL, productQuery, variables);

      setCartItems(responseProduct.cartItems);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const addCartItems = async (id, quantity) => {


    console.log("addCartItems function called");
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
    } catch (err) {
      console.log(err)
    }
  };

  const cancelCartItem = async (id) => {
    
    console.log("cancelCartItem function called");

    try {
      const deleteCartItemMutation = gql`
      mutation deleteCartItem($id: Int!) {
        deleteCartItem(id: $id) {
          id
        }
      }
    `;
      const variables = { id};

      let responseDeleteCartItem = await request(backEndGraphQLURL,deleteCartItemMutation,variables);
      console.log( responseDeleteCartItem.deleteCartItem);

    } catch (err) {
      console.log(err)
    }
  }

  const updateCartItemQuantity = async (id, currentQuantity, operation) => {

   
    const updateQuantity = async (id, quantity)=>{

      console.log("updateQuantity function called");
  
      try {
        const updateCartItemQuantityMutation = gql`
        mutation updateCartItemQuantity($id: Int!, $quantity: Int!) {
          updateCartItemQuantity(id: $id, quantity: $quantity) {
            id
          }
        }
      `;
        const variables = { id: id, quantity};
  
        let responseUpdateCartItemQuantity= await request(backEndGraphQLURL,updateCartItemQuantityMutation,variables);
        console.log( responseUpdateCartItemQuantity.updateCartItemQuantity);
  
      } catch (err) {
        console.log(err)
      }

    }

     if(operation === "add" ){
      updateQuantity(id, currentQuantity + 1);
    }
    if(operation === "minus"){
      updateQuantity(id, currentQuantity - 1);
    }
 
   
  }


  const contextValue = {
    totalCart,
    cartItems,
    setCartItems,
    findCartItems,
    addCartItems,
    cancelCartItem,
    updateCartItemQuantity
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
