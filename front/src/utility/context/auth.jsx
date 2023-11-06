import React, {useEffect, createContext, useContext, useState } from 'react';

import { Navigate, useNavigate } from "react-router";
import { request, gql } from "graphql-request"; // Import necessary functions and objects
import backEndGraphQLURL from "../../utility/http";


const AuthContext = createContext();



export const useAuth = ()=>{
    return useContext(AuthContext)
}



export default function AuthProvider({children}){

    const userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, '$1');

    const [token, setToken] = useState(null);
    
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [user, setUser] = useState({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
    });

    const navigate = useNavigate(); // Initialize the navigate function

    // const navigate = useNavigate();


    useEffect(() => {
      
        try{
          console.log("AUTH Context: userCookie == ", userCookie);


          if(userCookie){
            const storedUser = JSON.parse(userCookie);
            if (storedUser) {
              authorize(storedUser);
            }
          }
  
        }
        catch(error){
          console.log(error);
        }
       
      }, [isAuthenticated]);

    
      const authorize = async (token) => {
        const loginMutation = gql`
        mutation authorize($token: String!) {
          authorize(token: $token) {
            id
            firstName
            lastName
            email
          }
        }
      `;
        const variables = { token };
  
        let responseLogin = await request(backEndGraphQLURL,loginMutation,variables);
        login(token, responseLogin.authorize);
        console.log("authorization Success man == ", responseLogin.authorize);

      };

      const login = (token, userData)=>{
        document.cookie = `user=${JSON.stringify(token)}; path=/;`;
        setAuthenticated(true);
        setUser(userData);
        setToken(token);
      }

      const logOut = ()=>{
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null);
        setAuthenticated(false);
        setToken(null);
        navigate('/login');
        console.log("logout button clicked");
      }


    

      const contextValue = {
        token,
        login,
        logOut,
        user,
        setUser,
        isAuthenticated,
        setAuthenticated
      }

      return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
      )

}