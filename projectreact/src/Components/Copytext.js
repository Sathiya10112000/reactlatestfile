/*  //index.js 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//app.js
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import ProductApi from './Components/ProductApi';
import Login from './Components/Login';
import HomeComp from './Components/HomeComp';
import AdminLogin from './Components/AdminLogin';
import Productanagement from './Components/Productmanagement';
import { AuthProvider } from './Components/Auth';
import CRUDcreate from './Components/CRUDcreate';
import CRUDupdate from './Components/CRUDupdate';
import CRUDdelete from './Components/CRUDdelete';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import {RequireAuth} from './Components/RequireAuth'
function App() {
  return (
    <AuthProvider> 
    <Navbar></Navbar>
        <Routes>
        <Route path='/' element={<RequireAuth> <HomeComp></HomeComp></RequireAuth>} />
          
          
          <Route path='productmanagement' element={<RequireAuth> <Productanagement></Productanagement></RequireAuth>} />
          <Route path='productlist' element={<RequireAuth> <ProductApi></ProductApi></RequireAuth>} />
          <Route path='crudCreate' element={<RequireAuth><CRUDcreate></CRUDcreate></RequireAuth>} / >
          <Route path='crudupdate' element={<RequireAuth><CRUDupdate></CRUDupdate></RequireAuth> } />
          <Route path='crudDelete' element={ <RequireAuth> <CRUDdelete></CRUDdelete></RequireAuth>} />
         
          <Route path='login' element={<Login></Login>} />
          <Route path='adminlogin' element={<AdminLogin></AdminLogin>} />
          <Route path='register' element={<Register></Register>} / >
          </Routes>
     
      </AuthProvider>
  );
}
export default App;
//Login.js
<>
    <div className={styles.log}>
      <form  onSubmit={handleSubmit}>
        <p className={styles.error}> {errmsg} </p>
        <h2>UserSignin</h2>
    <div>
      <label  htmlFor='username'>UserName :</label>
     <input  id="username" type="text" value={username}  onChange={changeusername} ></input>
     <p className={styles.error}>{errusername}</p>
    </div>
    <div>
      <label htmlFor='password'> Password :</label>
    <input  id="password" type="password" value={password}  onChange={changepassword} ></input>
    <p className={styles.error}>{errpass}</p>
    </div>
    <button type='submit'> Login</button>
    </form>
   
      <div>Haven't register yet? <a href='#' onClick={() =>{ navigate('/register')}}>  Regiser </a> 
      </div>
    
    </div>
    </>
    //register.js
    import React ,{ useState }from 'react' ;
import axios from 'axios';
import styles from '../StylesRoute/login.module.css' ;
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
const Register = () => {
    const navigate=useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errmsg,setErrmsg] = useState('')
    const [errusername,setErrusername] = useState('')
    const [erremail,setErremail] = useState('')
    const [errpass,setErrpass] = useState('')
    const auth=useAuth()
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(username.trim() == '') {
         setErrusername('Please enter a valid username')
        }
        else if (password == ''){
         setErrpass('please enter a valid password')
        }
        else{
         axios.post('https://localhost:44352/api/Authenticate/register' ,{
           "username":username ,
           "email":email,
           "password":password
   
         })
         .catch(setErrmsg('Bad Credentials'))
         navigate('/login')
     
         
        }
     }
      
     const changeusername= (e) =>{
       setUsername(e.target.value)
       setErrusername('')
       setErrmsg('')
     }
     const changeemail= (e) =>{
       setEmail(e.target.value)
       setErremail('')
       setErrmsg('')
     }
   
     const changepassword= (e) =>{
       setPassword(e.target.value)
       setErrpass('')
       setErrmsg('')
     }
    
  return (
    <>
    <div className={styles.log}>
      <form  onSubmit={handleSubmit}>
        <p className={styles.error}> {errmsg} </p>
        <h2>Signin</h2>
    <div>
      <label  htmlFor='username'>UserName :</label>
     <input  id="username" type="text" value={username}  onChange={changeusername} ></input>
     <p className={styles.error}>{errusername}</p>
    </div>
    <div>
      <label  htmlFor='username'>Email :</label>
     <input  id="email" type="text" value={email}  onChange={changeemail} ></input>
     <p className={styles.error}>{erremail}</p>
    </div>
    <div>
      <label htmlFor='password'> Password :</label>
    <input  id="password" type="password" value={password}  onChange={changepassword} ></input>
    <p className={styles.error}>{errpass}</p>
    </div>
    <button type='submit'> Register</button>
    </form>
   
      <div>Haven't register yet? <a href='#' onClick={() =>{ navigate('/register')}}>  Regiser </a> 
      </div>
    
    </div>
    </>
  )
}
export default Register     
import React, {useState,useEffect}from 'react'
import axios from 'axios'
const ProductApi = () => {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        axios.get('https://localhost:44352/api/ElectronicProducts')
        .then(res =>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })
  return (
    <>
    <h1>Electronic Products List</h1>
    
        {
            posts.map(post =>(
               <div>
          <table >
         <tbody >  
         <tr >
             <th>ProductId</th>
             <th>ProductName</th>
             <th>brand</th>
             <th>AvailableCount</th>
             <th>Price</th>
             </tr>
          
              <tr key={post.productId}  >  
        <td>{post.productId}</td>
        <td>{post.productname}</td>
        <td>{post.brand}</td>
        <td>{post.availablecount}</td>
        <td>{post.price}</td>
      </tr>
          </tbody>
       </table>
      </div>
            ))
        }
    </ >
  )
}
export default ProductApi
//productApi
import React, {useState,useEffect}from 'react'
import axios from 'axios'
const ProductApi = () => {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        axios.get('https://localhost:44352/api/ElectronicProducts')
        .then(res =>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })
  return (
    <>
    <h1>Electronic Products List</h1>
    
        {
            posts.map(post =>(
               <div>
          <table >
         <tbody >  
         <tr >
             <th>ProductId</th>
             <th>ProductName</th>
             <th>brand</th>
             <th>AvailableCount</th>
             <th>Price</th>
             </tr>
          
              <tr key={post.productId}  >  
        <td>{post.productId}</td>
        <td>{post.productname}</td>
        <td>{post.brand}</td>
        <td>{post.availablecount}</td>
        <td>{post.price}</td>
      </tr>
          </tbody>
       </table>
      </div>
            ))
        }
    </ >
  )
}
export default ProductApi  
//app.js
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import ProductApi from './Components/ProductApi';
import Login from './Components/Login';
import HomeComp from './Components/HomeComp';
import AdminLogin from './Components/AdminLogin';
import Productanagement from './Components/Productmanagement';
import { AuthProvider } from './Components/Auth';
import CRUDcreate from './Components/CRUDcreate';
import CRUDupdate from './Components/CRUDupdate';
import CRUDdelete from './Components/CRUDdelete';
import Register from './Components/Register';
 import Navbar from './Components/Navbar';
import {RequireAuth} from './Components/RequireAuth';
//import Navbar from './NavbarComponent/Navbar';
function App() {
  return (
    <AuthProvider> 
    <Navbar></Navbar>
        <Routes>
        <Route path='/' element={<RequireAuth> <HomeComp></HomeComp></RequireAuth>} />
          
          
          <Route path='productmanagement' element={<RequireAuth> <Productanagement></Productanagement></RequireAuth>} />
          <Route path='productlist' element={<RequireAuth> <ProductApi></ProductApi></RequireAuth>} />
          <Route path='crudCreate' element={<RequireAuth><CRUDcreate></CRUDcreate></RequireAuth>} / >
          <Route path='crudupdate' element={<RequireAuth><CRUDupdate></CRUDupdate></RequireAuth> } />
          <Route path='crudDelete' element={ <RequireAuth> <CRUDdelete></CRUDdelete></RequireAuth>} />
         
          <Route path='login' element={<Login></Login>} />
          <Route path='adminlogin' element={<AdminLogin></AdminLogin>} />
          <Route path='register' element={<Register></Register>} / >
          </Routes>
     
      </AuthProvider>
  );
}
export default App;
component={Link} to="/edit/${post.productId}"

//new app.js with cart

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
import Navbar from "./Components/Navbar";



function App() {
  const [theme] = useThemeHook();
  return (
    <main className={theme? 'bg-black': 'bg-light-2'} style={{ height: '100vh', overflowY: 'auto'}}>
      <Header />
      
        <Routes>
        <Route path='/' element={<Login></Login>} />
       
       <Route path='/products' element={<ProductApi></ProductApi>} />
          <Route path='crudCreate' element={<CRUDcreate></CRUDcreate>} / >
  <Route path='/edit/:id' element={<CRUDupdate></CRUDupdate> } />
  <Route path='/cart' element={<Cart></Cart>} />
  <Route path='/home' element={<Home></Home>} />
  <Route path='/login' element={<Login></Login>} />
  <Route path='/register' element={<Register></Register>} />
  <Route path='/adminlogin' element={<AdminLogin></AdminLogin>} />
  <Route path='/navbar' element={<Navbar></Navbar>} />
          
  </Routes>



  </main>
  );
}
   
  export default App;
  
  //ProductApi

  import React, {useState,useEffect}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {  deleteUser } from '../Service/api';

const ProductApi = () => {
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    

    useEffect(()=>{
        axios.get('https://localhost:44379/api/Products')
        .then(res =>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const deleteUserData = async (id) => {
        await deleteUser(id);
        alert('confirm !.....you want to delete the record')
        window.location.reload();
    }

    

    
  return (
    <>
    <h1>Add Products</h1>
                <button onClick={() =>{ navigate('/crudCreate')}} >Addproducts</button>
    

    <h1>Electronic Products List</h1>
    
        {
            posts.map(post =>(
               <div>
          <table >
         <tbody >  
         <tr >
             <th>ProductId</th>
             <th>ProductImage</th>
             <th>ProductName</th>
             <th>brand</th>
             <th>AvailableCount</th>
             <th>Price</th>
             </tr>
          
              <tr key={post.productId}  >  
        <td>{post.id}</td>
        <img variant="top" src={post.productImage} className="img-fluid" />
       
        <td>{post.productname}</td>

        <td>{post.brand}</td>
        <td>{post.availablecount}</td>   
        <td>{post.price}</td> 
        <td>
            <button onClick={() =>{navigate(`/edit/${post.id}`)}} >Update</button>
        </td>

        <td>
        <button color="secondary"  onClick={() => deleteUserData(post.id)}>Delete</button> 
        </td>
      </tr>
          </tbody>
       </table>
      </div>
            ))
        }
       
    </ >
  )
}

export default ProductApi;

//login.js
import axios from 'axios';
import React, { useState } from 'react' ;
import styles from '../StylesRoute/login.module.css' ;
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
import profile from "../login.png";
import emailimg from "../email.png";
import passwordimg from "../password.png";

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')             
    const [password, setPassword] = useState('')
    const [errmsg,setErrmsg] = useState('')               
    const [erremail,setErremail] = useState('')
    const [errpass,setErrpass] = useState('')             
    const auth=useAuth()


    const handleSubmit = (e) =>{
       e.preventDefault()
       if(email.trim() == '') {
        setErremail('Please enter a valid username')
       }
       else if (password == ''){
        setErrpass('please enter a valid password')
       }
       else{
        axios.post('https://localhost:44379/api/Authenticate/login' ,{
          "email":email ,
          "password":password

        })
        .then((res) =>{ localStorage.setItem('token' , res.data.token)
        auth.login(email)
        navigate('/')
      })
        .catch(setErrmsg('Bad Credentials'))
       }
    }
     
    const changeemail= (e) =>{
      setEmail(e.target.value)
      setErremail('')
      setErrmsg('')
    }

    const changepassword= (e) =>{
      setPassword(e.target.value)
      setErrpass('')
      setErrmsg('')
    }

  return (
    <div className="main">
    <div className="sub-main">
    <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
    
      <form  onSubmit={handleSubmit}>
        <p className="error"> {errmsg} </p>
        <h2>Login</h2>
    <div>
    <img src={emailimg} alt="email" className="email"/>
      
     <input  type="text"   placeholder="Email" onChange={changeemail} className="name"></input>
     <p  className="error">{erremail}</p>
    </div>

    <div  className="second-input">
    <img src={passwordimg} alt="pass" className="email"/>
     
    <input type="password"  placeholder="Password" onChange={changepassword} className="name" ></input>
    <p  className="error">{errpass}</p>
    </div>
    <button type='submit'   onClick={() =>{ navigate('/products')}}> Login</button>
    
    <div>Haven't register yet? <a href='#' onClick={() =>{ navigate('/register')}}>  Regiser </a> 

      </div>
    </form>
    </div>
    </div>
    </div>
    
  )
}

export default Login;

//new register

import React ,{ useState }from 'react' ;
import axios from 'axios';
import styles from '../StylesRoute/login.module.css' ;
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
import profile from "../login.png";



const Register = () => {
    const navigate=useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[phoneNo,setPhoneNo]=useState('')
    const [errmsg,setErrmsg] = useState('')
    const [errusername,setErrusername] = useState('')
    const [erremail,setErremail] = useState('')
    const [errpass,setErrpass] = useState('')
    
    const auth=useAuth()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(username.trim() == '') {
         setErrusername('Please enter a valid username')
        }
        else if (password == ''){
         setErrpass('please enter a valid password')
        }
        else{
         axios.post('https://localhost:44379/api/Authenticate/register' ,{
           "username":username ,
           "email":email,
           "password":password,
           "phoneNo":phoneNo
   
         })
         .catch(setErrmsg('Bad Credentials'))
         navigate('/login')
     
         
        }
     }
      
     const changeusername= (e) =>{
       setUsername(e.target.value)
       setErrusername('')
       setErrmsg('')
     }
     const changeemail= (e) =>{
       setEmail(e.target.value)
       setErremail('')
       setErrmsg('')
     }
   
     const changepassword= (e) =>{
       setPassword(e.target.value)
       setErrpass('')
       setErrmsg('')
     }
     const changephoneno= (e) =>{
      setPhoneNo(e.target.value)
      setErrpass('')
      setErrmsg('')
    }
    
  return (
    
   <div className="main">
    <div className="sub-main">
    <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
      <form  onSubmit={handleSubmit}>
        <p className={styles.error}> {errmsg} </p>
        <h2>Register</h2>
    <div>
      
     <input  type="text"   placeholder="Username" onChange={changeusername} className="name"></input>
     <p className={styles.error}>{errusername}</p>
    </div>
    <div>
      
     <input  type="text" placeholder="Email"  onChange={changeemail} className="name" ></input>
     <p className={styles.error}>{erremail}</p>
    </div>

    <div>
      
    <input  type="password"  placeholder="Password" onChange={changepassword}  className="name"></input>
    <p className={styles.error}>{errpass}</p>
    </div>
    <div>
      
    <input  type="text"  placeholder="PhoneNo" onChange={changephoneno}  className="name"></input>
    <p className={styles.error}>{errpass}</p>
    </div>
    <button type="submit"  onClick={() =>{ navigate('/login')}}> Register</button>
    </form>
   
     
     </div>
    
    </div>
    </div>
   
  )
}

export default Register

//newlogin

import axios from 'axios';
import React, { useState } from 'react' ;

import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
import profile from "../login.png";
import emailimg from "../email.png";
import passwordimg from "../password.png";

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')             
    const [password, setPassword] = useState('')
    const [errmsg,setErrmsg] = useState('')               
    const [erremail,setErremail] = useState('')
    const [errpass,setErrpass] = useState('')             
    const auth=useAuth()


    const handleSubmit = (e) =>{
       e.preventDefault()
       if(email.trim() == '') {
        setErremail('Please enter a valid username')
       }
       else if (password == ''){
        setErrpass('please enter a valid password')
       }
       else{
        axios.post('https://localhost:44379/api/Authenticate/login' ,{
          "email":email ,
          "password":password

        })
        .then((res) =>{ localStorage.setItem('token' , res.data.token)
        auth.login(email)
        navigate('/')
      })
        .catch(setErrmsg('Bad Credentials'))
       }
    }
     
    const changeemail= (e) =>{
      setEmail(e.target.value)
      setErremail('')
      setErrmsg('')
    }

    const changepassword= (e) =>{
      setPassword(e.target.value)
      setErrpass('')
      setErrmsg('')
    }

  return (
    <div className="main">
    <div className="sub-main">
    <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
    
      <form  onSubmit={handleSubmit}>
        <p className="error"> {errmsg} </p>
        <h2>Login</h2><br/>
    <div className='input'>
   
    <span><i class="fa fa-envelope-o"></i></span>
     <input   type="text"   placeholder="Email" onChange={changeemail} className="name"></input>
    
     <p  className="error">{erremail}</p>
    </div>

    <div  className="second-input">
    
  
    <span><i class="fa fa-lock"></i></span>
    <input type="password"  placeholder="Password" onChange={changepassword} className="name" ></input>
    <p  className="error">{errpass}</p>
    </div>
    <button type="submit"   onClick={() =>{ navigate('/customerproducts')}}> Login</button>
    
    <div>Haven't register yet? <a href='#' onClick={() =>{ navigate('/register')}}>  Regiser </a> 

      </div>
      
    </form>
    </div>
    </div>
    </div>
    
  )
}

export default Login;

*import React ,{ useState }from 'react' ;
import axios from 'axios';
import styles from '../StylesRoute/login.module.css' ;
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
import profile from "./Components/5087579.png";

const Register = () => {
    const navigate=useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [errmsg,setErrmsg] = useState('')
    const [errusername,setErrusername] = useState('')
    const [erremail,setErremail] = useState('')
    const [errpass,setErrpass] = useState('')
    const auth=useAuth()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(username.trim() == '') {
         setErrusername('Please enter a valid username')
        }
        else if (password == ''){
         setErrpass('please enter a valid password')
        }
        else{
         axios.post('https://localhost:44352/api/Authenticate/register' ,{
           "username":username ,
           "email":email,
           "password":password
   
         })
         .catch(setErrmsg('Bad Credentials'))
         navigate('/login')
     
         
        }
     }
      
     const changeusername= (e) =>{
       setUsername(e.target.value)
       setErrusername('')
       setErrmsg('')
     }
     const changeemail= (e) =>{
       setEmail(e.target.value)
       setErremail('')
       setErrmsg('')
     }
   
     const changepassword= (e) =>{
       setPassword(e.target.value)
       setErrpass('')
       setErrmsg('')
     }
    
  return (
    
   <div className="main">
    <div className="sub-main">
    <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
      <form  onSubmit={handleSubmit}>
        <p className={styles.error}> {errmsg} </p>
        <h2>Register</h2>
    <div>
      
     <input  type="text"   placeholder="Username" onChange={changeusername} className="name"></input>
     <p className={styles.error}>{errusername}</p>
    </div>
    <div>
      
     <input  type="text" placeholder="Email"  onChange={changeemail} className="name" ></input>
     <p className={styles.error}>{erremail}</p>
    </div>

    <div>
      
    <input  type="password"  placeholder="Password" onChange={changepassword}  className="name"></input>
    <p className={styles.error}>{errpass}</p>
    </div>
    <button type='submit'> Register</button>
    </form>
   
     
     </div>
    
    </div>
    </div>
   
  )
}

export default Register 

import React, { useState } from 'react'
import axios from 'axios'
import styles from '../Styles/login.module.css';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth';


const Login = () => {
    const navigate=useNavigate('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const [errmsg,seterrmsg]=useState('')
    const [erremail,seterremail]=useState('')
    const [errpassword,seterrpassword]=useState('')
    const auth=useAuth()
    const handlesubmit=(e)=>{
        e.preventDefault()
        if(email.trim()===''){
        seterremail('please enter a username')}
        else if(password===''){
        seterrpassword('please enter a password')
    }
    else{
        axios.post('https://localhost:44362/api/Login/login',{
        "email":email,
        "password":password
    })
        .then((res)=>{
            
           localStorage.setItem('token',res.data.token)
           auth.login(email)
           navigate('/home')
            })
            .catch((res)=>{
                seterrmsg('Bad Credentials')
                auth.user=null
        })
    }
}
    
    const changeemail=(e)=>{
        setemail(e.target.value)
        seterremail('')
        seterrmsg('')
        
    }
    const changepassword=(e)=>{
        setpassword(e.target.value)
        seterrpassword('')
        seterrmsg('')
    
    }
    
    
  return (
    <>
    <section>
        <form onSubmit={handlesubmit}>
            <p className={styles.error}>{errmsg}</p>
            <h2>Sign in</h2>
            <div>
                <label htmlFor='username'>Username</label>
                <input id='email' type='text' value={email} onChange={changeemail}></input>
                <p  className={styles.error}>{erremail}</p>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' type='Password' value={password} onChange={changepassword}></input>
                <p className={styles.error}>{errpassword}</p>
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
              
        </form>
    </section>
    <hr></hr>
    <div>
               New user?click to sign up!! <button href='#' onClick={()=>{navigate('/customer')}}>Register</button>
           </div>
    </>
  )
  }

export default Login



*/