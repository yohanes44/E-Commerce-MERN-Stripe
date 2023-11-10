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

  const [deleteCartItem, setDeletedCartItem] = useState({});

  useEffect(() => {
    let fetchData = async () =>{
      
      try{
        // if (isAuthenticated) {
          // findTotalCart(user.id);
          // findCartItems(user.id);
          
          
          //  console.log({user});
          if (isAuthenticated) {
            findTotalCart(user.id);
            findCartItems(user.id);
          }
          //start
      //     const findCartItemQuery = gql`
      //     query GetCartItems($userId: Int!) {
      //       cartItems(userId: $userId) {
      //         id
      //         userId
      //         productId
      //         state
      //         quantity
      //         product {
      //           id
      //           img
      //           name
      //           price
      //         }
      //         variation {
      //           id
      //           img
      //           size
      //           color
      //           quantity
      //         }
      //       }
      //     }
      //   `;
  
      //   const findCartItemVariables = { userId: parseInt(user.id) };
      //   const findCartItemResponse = await request(backEndGraphQLURL, findCartItemQuery, findCartItemVariables);
        
      //   // console.log({response});
  
  
      //   setTotalCart(findCartItemResponse.cartItems.length);

      //   const productQuery = gql`
      //   query GetCartItems($userId: Int!) {
      //     cartItems(userId: $userId) {
      //       id,
      //       userId,
      //       productId,
      //       state,
      //       quantity,
    	// 			product {
    	// 			  id,
      //         img,
      //         name,
      //         price
    	// 			},
    	// 			variation {
    	// 			  id,
      //         img,
      //         size,
      //         color,
      //         quantity
    	// 			}
      //     }
      //   }
      // `;

      // const productVariables = { userId: parseInt(user.id) };
      // const responseProduct = await request(backEndGraphQLURL, productQuery, productVariables);
      
      // console.log("findCartItems");
      // setCartItems(responseProduct.cartItems);

        
          //end
        
        
        }

      // }
      catch(err){

      }
      

    }

    fetchData();

   
  }, [user.id, cartItem, cartItems.length, deleteCartItem]);



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
              img
              name
              price
    				}
    				variation {
    				  id
              img
              size
              color
              quantity
    				}
          }
        }
      `;

      const variables = { userId: parseInt(userId) };
      const response = await request(backEndGraphQLURL, findCartItemQuery, variables);
      
      // console.log({response});


      setTotalCart(response.cartItems.length);
    } catch (error) {
      console.error(error.message);
    }
  };

  const findCartItems = async (userId) => {
    try {
      const productQuery = gql`
        query GetCartItems($userId: Int!) {
          cartItems(userId: $userId) {
            id,
            userId,
            productId,
            state,
            quantity,
    				product {
    				  id,
              img,
              name,
              price
    				},
    				variation {
    				  id,
              img,
              size,
              color,
              quantity
    				}
          }
        }
      `;

      const variables = { userId: parseInt(userId) };
      const responseProduct = await request(backEndGraphQLURL, productQuery, variables);
      
      console.log("findCartItems");
      setCartItems(responseProduct.cartItems);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addCartItems = async (id, quantity, variationId) => {


    console.log("addCartItems function called");


    const userId = parseInt(user.id);
    const productId = id;

    variationId = parseInt(variationId);

    try {
      const addToCartMutation = gql`
      mutation addCartItem($productId: Int!, $userId: Int!, $variationId: Int!, $quantity: Int!) {
        addCartItem(productId: $productId, userId: $userId, variationId: $variationId, quantity: $quantity) {
          userId
          productId
        }
      }
    `;
      const variables = { userId, productId, quantity, variationId};

      let responseAddCartItem = await request(backEndGraphQLURL,addToCartMutation,variables);
      setCartItem(responseAddCartItem.addCartItem);

      // console.log({added: responseAddCartItem.addCartItem.productId});
    } catch (err) {
      console.log(err)
    }
  };


  const addOrder = async (userId) => {


    console.log("addOrder function called");


    userId = parseInt(user.id);
    // const productId = id;

    // variationId = parseInt(variationId);

    try {
      const addOrderMutation = gql`
      mutation addOrder($userId: Int!) {
        addOrder(userId: $userId) {
          userId
        }
      }
    `;
      const variables = { userId };

      let responseAddCartItem = await request(backEndGraphQLURL, addOrderMutation, variables);
      setCartItem( responseAddCartItem.addOrder);
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
      // console.log( {deleteCartItem: responseDeleteCartItem.deleteCartItem.id});

      setDeletedCartItem(responseDeleteCartItem.deleteCartItem);
      // setCartItems((prev)=>{
      //   return (prev.id != responseDeleteCartItem.deleteCartItem.id) ? true : false;
      // })

      // setCartItems( (prev)=>{
      //   return (prev.id != responseDeleteCartItem.deleteCartItem) ? true : false
      // } )

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
    // findCartItems,
    addCartItems,
    addOrder,
    cancelCartItem,
    updateCartItemQuantity
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
