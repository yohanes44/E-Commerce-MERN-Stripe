import React, {useState, useEffect} from 'react'

import "./login.scss"

import { useAuth } from "../../utility/context/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { request, gql } from "graphql-request"; // Import necessary functions and objects
import backEndGraphQLURL from "../../utility/http";


export default function Login() {

  const {isAuthenticated, setAuthenticated, login, setToken, user, setUser} = useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  
  const navigate = useNavigate();

  console.log("Login check User is Authenticated ? " , isAuthenticated);
  
  if(isAuthenticated){
    navigate('/');
  }

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    if (isAuthenticated) {
      navigate('/');
    }
    
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try{
      const loginMutation = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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
      const variables = { email, password};

      let responseLogin= await request(backEndGraphQLURL,loginMutation,variables);
      console.log("test Login Success man == ", responseLogin.login.token);
      login(responseLogin.login.token, responseLogin.login.user); 
      // console.log("Login: setUser test");
      // console.log(responseLogin.login.user)

      // setUser(responseLogin.login.user)
      // setToken(responseLogin.login.token);
      // setAuthenticated(true);
    }
    catch(err){
      console.log(err.message);
      setError(err.message);
    }

  }

  return (
    <div className='loginContainer'>
    <div className="wrapper">
       {/* <div>
         <h1>email = {email}</h1>
         <h1>password ={password}</h1>
       </div> */}
        <h1 className="title">SIGN IN</h1>
        <form action="">
            <input type="text" name="email" placeholder='email' onChange={(e)=>{
              const val = e.target.value;
              setEmail(val);
            }} />
            <input type="text" name="password" placeholder='password' onChange={(e)=>{
                 const val = e.target.value;
                 setPassword(val);
            }}/>
            <button onClick={handleSubmit} >LOGIN</button>
            {/* <link */}
            <a>DO NOT YOU REMEMBER THE PASSWORD?</a>
            <a>CREATE A NEW ACCOUNT</a>
        </form>
    </div>
</div>
  )
}
