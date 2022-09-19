import { useState, useEffect } from 'react';


import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';

const initialValue = {
 
  id:'',
  productImage:'',
  productName: '',
  brand: '',
  description:'',
  availableCount: '',
  price:''
}




const  CRUDupdate = () => {
    const [user, setUser] = useState(initialValue);
    const {productImage,productName, brand, availableCount, price ,description} = user;
    const { id } = useParams();
    const navigate=useNavigate();
    
    

    useEffect(() => {
        loadUserDetails();
    },[]);
   

    const loadUserDetails = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails = async() => {
        const response = await editUser(id, user);
       
        navigate('/newproduct');.0
        
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
      <form>
        
            <h1>Edit Information</h1>
            
            <div>
                <label htmlFor="my-input">ProductId</label>
                <input onChange={(e) => onValueChange(e)} name='id' value={user.id} id="my-input" aria-describedby="my-helper-text" />
            </div>
            <div>
                <label htmlFor="my-input">ProductName</label>
                <input onChange={(e) => onValueChange(e)} name='productName' value={user.productName} id="my-input" aria-describedby="my-helper-text" />
            </div>
            <div>
                <label htmlFor="my-input">Brand</label>
                <input onChange={(e) => onValueChange(e)} name='brand' value={user.brand} id="my-input" aria-describedby="my-helper-text" />
            </div>
            <div>
                <label htmlFor="my-input">Description</label>
                <input onChange={(e) => onValueChange(e)} name='description' value={user.description} id="my-input" aria-describedby="my-helper-text" />
            </div>
            <div>
                <label htmlFor="my-input">AvailableCount</label>
                <input onChange={(e) => onValueChange(e)} name='availableCount' value={user.availableCount} id="my-input" aria-describedby="my-helper-text" />
            </div>
            <div>
                <label htmlFor="my-input">Price</label>
                <input onChange={(e) => onValueChange(e)} name='price' value={user.price} id="my-input" aria-describedby="my-helper-text" />
            </div>
            <NavLink to="/products">
            <div>
                <button  color="primary" onClick={() => editUserDetails()}>Edit User</button>
            </div>
            </NavLink>
        
        </form>
    )
}

export default CRUDupdate;