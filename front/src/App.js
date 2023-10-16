// import logo from './logo.svg';
// import './App.scss';

import Pay from "./components/stripe/pay";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import Register from "./pages/register/Register";

// import {Router, Route, Switch } from "react-router";


//admin pages
import HomeAdmin from "./pages/adminPanel/home/Home";
import ListAdmin from "./pages/adminPanel/list/List";
import Single from "./pages/adminPanel/single/Single";
import New from "./pages/adminPanel/new/New";


// New
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate 
} from "react-router-dom";

import { productInputs, userInputs } from "./formSource";


import AuthProvider , { useAuth } from "./utility/context/auth";

import CartProvider , { useCart } from "./utility/context/cart";
import DarkModeProvider from "./utility/context/darkMode";

function App() {


  // const requireAuth = (element)=>{
  //   console.log("APP.js isAuthenticated check == ", isAuthenticated + " user == ", user );
  //   return isAuthenticated ? element : <Navigate to="/login"/>
  // }

  // const NotAuthenticated = (element)=>{
  //   console.log("APP.js isAuthenticated check == ", isAuthenticated + " user == ", user );
  //   return (isAuthenticated === false) ? element : <Navigate to="/"/>;
  // }

  return (
    <Router>
     <AuthProvider>
      <CartProvider>
        <DarkModeProvider>
      <Routes>
        <Route path="/" element={ <Home />} /> 
        <Route  path="/products/:category" element={<ProductList />} /> 
        <Route path="/product/:id" element={<Product />} /> 

        <Route path="/cart" element={ <Cart />} /> 
        {/* <Route path="/login">
            {user? <Login />: <Login />}
        </Route>  */}
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={ <Login /> } /> 
        <Route path="adminPanel">
            <Route index element={<HomeAdmin/>}/>
            <Route path="users">
              <Route index element={<ListAdmin/>}/>
              <Route path=":userId" element={<Single/>}/> 
              <Route path="new" element={<New inputs={userInputs} title="Add New User"/>}/> 
            </Route>
            <Route path="product">
              <Route index element={<ListAdmin/>}/>
              <Route path=":productId" element={<Single/>}/> 
              <Route path="new" element={<New inputs={productInputs} title="Add New Product"/>}/> 
            </Route>
        </Route>
      </Routes>
      </DarkModeProvider>

      </CartProvider>
    </AuthProvider>

    </Router>
  );
}

export default App;
