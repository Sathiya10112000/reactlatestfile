import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useThemeHook } from './Components/Theme';
import Header from './Components/Header';
import { Router } from "@reach/router";
import {Routes,Route,Link} from 'react-router-dom';
import { useCart } from 'react-use-cart';
//import {BrowserRouter as  Route,Router,Switch} from 'react-router-dom'

import Home from './Components/Home';
import Cart from './Components/Cart';
import ProductApi from "./Components/ProductApi";
import CRUDcreate from "./Components/CRUDcreate";
import CRUDupdate from "./Components/CRUDupdate";
import Register from "./Components/Register";
import AdminLogin from "./Components/AdminLogin";
import Login from "./Components/Login";
import Navbar from "./Navbar/Navbar";
//import {RequireAuth} from './Components/RequireAuth'
import Newhome from "./Components/Newhome";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Components/Auth";
import Payment from "./Components/Payment";



function App() {
  const [theme] = useThemeHook();
  return (
    <AuthProvider>
    <main className={theme? 'bg-black': 'bg-light-2'} style={{ height: '100vh', overflowY: 'auto'}}>
      <Navbar></Navbar>
      
      
        <Routes>
       
        <Route path='/' element={<Login></Login>} />
       
       <Route path='/products' element={<ProductApi></ProductApi>} />
          <Route path='/crudCreate' element={<CRUDcreate></CRUDcreate>} />
  <Route path='/edit/:id' element={<CRUDupdate></CRUDupdate> } />
  <Route path='/cart' element={<Cart></Cart>} />
  <Route path='/customerproducts' element={<Home></Home>} />
  
  <Route path='/register' element={<Register></Register>} />
  <Route path='/adminlogin' element={<AdminLogin></AdminLogin>} />
  <Route path='/navbar' element={<Navbar></Navbar>} />
  <Route path='/adminproducts' element={<Newhome></Newhome>}/>
  <Route path='/payment' element={<Payment></Payment>}></Route>
     
  </Routes>
 <Footer></Footer>
    
  


  </main>
  </AuthProvider>

  );
}
   
  export default App;