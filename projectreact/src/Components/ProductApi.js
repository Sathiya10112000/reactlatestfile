import React, {useState,useEffect}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {  deleteUser } from '../Service/api';
import Footer from './Footer';

const ProductApi = () => {
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    

    useEffect(()=>{
        axios.get('https://localhost:7027/api/Product')
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
             <th>description</th>
             <th>AvailableCount</th>
             <th>Price</th>
             </tr>
          
              <tr key={post.productId}  >  
        <td>{post.id}</td>
        <img variant="top" src={post.productImage} className="img-fluid" />
       
        <td>{post.productname}</td>

        <td>{post.brand}</td>
        <td>{post.description}</td>
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
<Footer/>
export default ProductApi;