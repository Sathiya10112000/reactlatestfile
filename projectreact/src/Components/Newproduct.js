import React from 'react';
import { Button, Card} from 'react-bootstrap';
import { useThemeHook } from '../Components/Theme';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {  deleteUser } from '../Service/api';
import { Navigate } from 'react-router-dom';


const Newproduct = (props) => {
    let {id ,productImage,productname,price,brand} = props.data;
    const navigate=useNavigate();
    const [theme] = useThemeHook();
    const {addItem}=useCart();
    const addToCart = () =>{
        addItem(props.data);
    }
    const deleteUserData = async (id) => {
        await deleteUser(id);
        alert('confirm !.....you want to delete the record')
        window.location.reload();
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
          var options = {
            key: "rzp_test_rVB3fZyycD7g4o",
            key_secret:"SaUgUXwRoJtLfcZ5F0IsGNbn",
            amount: {price} *100,
            currency:"INR",
            name:"STARTUP_PROJECTS",
            description:"for testing purpose",
            handler: function(response){
              alert(response.razorpay_payment_id);
            },
            prefill: {
              name:"Velmurugan",
              email:"mvel1620r@gmail.com",
              contact:"7904425033"
            },
            notes:{
              address:"Razorpay Corporate office"
            },
            theme: {
              color:"#3399cc"
            }
          };
          var pay = new window.Razorpay(options);
          pay.open();
      }

   
    return (
        
        <Card 
            style={{ width: '18rem', height: 'auto' }}
            className={`${theme? 'bg-light-black text-light':'bg-lihgt text-black'} text-center p-0 overflow-hidden shadow mx-auto mb-4`}
        >
            <div style={{ background: 'white', height: '15rem', overflow: 'hidden', display: 'flex',
            justifyContent: 'center', alignItems: 'center', marginBottom: 'inherit' }}>
                <div style={{ width: '9rem'}}>
                    <img variant="top" src={productImage} className="img-fluid" />
                </div>
            </div>
            
            
            <Card.Body>
            <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                    {id}
                </Card.Title>
                <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                    {productname}
                </Card.Title>
                <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                    {brand}
                </Card.Title>
                <Card.Title>
                    Rs. <span className="h3">{price}</span>
                </Card.Title>
                <Button
                    onClick={() =>{navigate(`/edit/${id}`)}} 
                    className={`${theme? 'bg-dark-primary text-black':'bg-light-primary' } d-flex align-item-center m-auto border-0`}
                >
                    
                    Update
                </Button>
                <br></br>
                <Button
                     onClick={() => deleteUserData(id)}
                    className={`${theme? 'bg-dark-primary text-black':'btn btn-success' } d-flex align-item-center m-auto border-0`}
                    id="buy"
                >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Newproduct;