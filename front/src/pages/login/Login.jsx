import React from 'react'

import "./login.scss"

export default function Login() {
  return (
    <div className='loginContainer'>
    <div className="wrapper">
        <h1 className="title">SIGN IN</h1>
        <form action="">
            <input type="text" placeholder='username'/>
            <input type="text" placeholder='password'/>
            <button>LOGIN</button>
            {/* <link */}
            <a>DO NOT YOU REMEMBER THE PASSWORD?</a>
            <a>CREATE A NEW ACCOUNT</a>
        </form>
    </div>
</div>
  )
}
