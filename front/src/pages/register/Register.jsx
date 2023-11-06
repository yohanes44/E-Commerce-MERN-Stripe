import React, {useState, useEffect} from 'react'

import "./register.scss"

import { useAuth } from "../../utility/context/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { request, gql } from "graphql-request"; // Import necessary functions and objects
import backEndGraphQLURL from "../../utility/http";

import {
  Link
} from "react-router-dom"


export default function Register() {

  const {isAuthenticated, setAuthenticated, login, setToken, user, setUser} = useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [sub_city, setsubCity] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  

  
  const navigate = useNavigate();


  const handleSubmit = async (e)=>{
    e.preventDefault();

    // console.log({firstName, lastName, email, password, repeatPassword});


    
    try{
      const registerMutation = gql`
      mutation addUser($firstName: String!, $lastName: String!, $email: String!, $phoneNumber: String!, $city: String!, $sub_city: String, $password: String!, $repeatPassword: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, city: $city, sub_city: $sub_city, password: $password, repeatPassword: $repeatPassword) {
              token
              user{
                id
                firstName
                lastName
                email
              }
            
        }
      }
    `;


      const variables = { firstName, lastName, email, phoneNumber, city, sub_city, password, repeatPassword, };

      let responseLogin= await request(backEndGraphQLURL,registerMutation,variables);
      // console.log("test Login Response " );
      // console.log(typeof responseLogin.errors);
      console.log("test Login Success man == ")
      
      console.log({token: responseLogin.addUser.token, user: responseLogin.addUser.user});

      login(responseLogin.addUser.token, responseLogin.addUser.user); 
      navigate('/');
    
      // console.log("Login: setUser test");
      // console.log(responseLogin.login.user)

      // setUser(responseLogin.login.user)
      // setToken(responseLogin.login.token);
      // setAuthenticated(true);
    }
    catch(err){
      console.log(err.message);
      setError(err.message.split("።")[0 ]);
    }

  }



  return (
    <div className='registerContainer'>
        <div className="wrapper">
            <h1 className="title">CREATE AN ACCOUNT</h1>

            {
              error ? <div style={{ color: "red"}}>{error}</div> : null
            }
            <form action="" onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder='firstName' onChange={(e)=>{
              const val = e.target.value;
              setFirstName(val);
            }} />

                <input type="text"  name="lastName"  placeholder='lastName'  onChange={(e)=>{
                  const val = e.target.value;
                  setLastName(val);
                }} />

                <input type="text"  name="phoneNumber"  placeholder='phoneNumber'  onChange={(e)=>{
                  const val = e.target.value;
                  setPhoneNumber(val);
                }}/>

                <input type="text"  name="email"  placeholder='email'  onChange={(e)=>{
                  const val = e.target.value;
                  setEmail(val);
                }}/>

              <input type="text"  name="city"  placeholder='city'  onChange={(e)=>{
                  const val = e.target.value;
                  setCity(val);
                }}/>

                <input type="text"  name="sub_city"  placeholder='sub_city'  onChange={(e)=>{
                  const val = e.target.value;
                  setsubCity(val);
                }}/>

              <input type="text"  name="password"  placeholder='password'  onChange={(e)=>{
                  const val = e.target.value;
                  setPassword(val);
                }}/>

                <input type="text"  name="repeatPassword"  placeholder='repeatPassword'  onChange={(e)=>{
                  const val = e.target.value;
                  setRepeatPassword(val);
                }}/>


            
                <div className="actions">
                  <button>CREATE</button>
                  <button style={{
                     backgroundColor: "rgba(0, 128, 128, 0.555)",
                  }}><Link style={{
                    textDecoration: "none",
                    color: 'white'
                  }} to="/login">
                  Login
                  </Link></button>
                </div>
                <span className="agreement">
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </span>
            </form>
        </div>
    </div>
  )
}
