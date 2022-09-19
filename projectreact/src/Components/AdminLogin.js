import axios from 'axios';
import React, { useState } from 'react' ;
import styles from '../StylesRoute/login.module.css' ;
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
import profile from "../login.png";
import emailimg from "../email.png";
import passwordimg from "../password.png";


const AdminLogin = () => {

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
        setErremail('Please enter a valid Email')
       }
       else if (password == ''){
        setErrpass('please enter a valid password')
       }
       else{
        axios.post('https://localhost:7027/api/Authenticate/Authenticate' ,{
          "email":email ,
          "password":password

        })
        .then((res) =>{ localStorage.setItem('token' , res.data.token)
        auth.login(email)
        
      })
        .catch(setErrmsg('Bad Credentials'))

       }
        
       if(email=='sathya12@gmail.com' && password=='Sathya@123'){
        navigate('/adminproducts')
       }
       else
       {
        alert('you cannot able to view the admin page....Admin page is restricted')
        navigate('/login')
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
        <p className={styles.error}> {errmsg} </p>
        <h2>Admin</h2>
    <div>
    <img src={emailimg} alt="email" className="email"/>
     
     <input  type="text" placeholder="Username"  onChange={changeemail} className="name" ></input>
     <p className={styles.error}>{erremail}</p>
    </div>

    <div>
    <img src={passwordimg} alt="pass" className="email"/>
    <input  type="password" placeholder="Password"  onChange={changepassword} className="name"></input>
    <p className={styles.error}>{errpass}</p>
    </div>
    <button type='submit'> Login</button>
    </form>
    </div>
    </div>
    
    </div>
    
  )
}

export default AdminLogin;