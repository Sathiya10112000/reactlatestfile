import React from 'react';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useThemeHook } from '../Components/Theme';
import { BsCartCheck, BsCartX} from 'react-icons/bs';
import empty from "../emptycart.gif";
import "../App.css";
import { Link } from '@reach/router';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [theme] = useThemeHook();
    const {
        isEmpty,
        items,
        cartTotal,
        
        updateItemQuantity,
        removeItem,
        emptyCart,
        
    } = useCart();
    return (
        <Container className="py-4 mt-5">
            <h1 className={`${theme? 'text-light': 'text-light-primary'} my-5 text-center`}>
                {isEmpty? <img src={empty}></img> : 'The Cart'}
            </h1>
            <NavLink to="/home">
            <button type='submit' id='shop' className='btn btn-primary'>Shop now</button>
            </NavLink>
            <Row className="justify-content-center">
                <Table responsive="sm" striped bordered hover variant={theme? 'dark': 'light'} className="mb-5">
                    <tbody>
                        {items.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis'}}>
                                            {item.id}
                                        </h6>
                                    </td>
                                    <td>
                                        <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ padding: '.5rem'}}>
                                                <img src={item.productImage} style={{ width: '4rem'}} alt={item.productname} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis'}}>
                                            {item.productname}
                                        </h6>
                                    </td>
                                    <td>Rs. {item.price}</td>
                                   <td>Quantity ({item.quantity})</td>
                                    <td>
                                        <Button onClick={()=> updateItemQuantity(item.id, item.quantity - 1)} className="ms-2">-</Button>
                                        <Button onClick={()=> updateItemQuantity(item.id, item.quantity + 1)} className="ms-2">+</Button>
                                        <Button variant="danger" onClick={()=> removeItem(item.id)} className="ms-2">Remove Item</Button>
                            </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {!isEmpty &&
                    <Row 
                        style={{ position: 'fixed', bottom: 0}}
                        className={`${theme? 'bg-light-black text-light' : 'bg-light text-balck'} justify-content-center w-100`}
                    >
                        <Col className="py-2">
                            <h4>Total Price: Rs. {cartTotal}</h4>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="danger"
                                className="m-2"
                                onClick={()=> emptyCart()}
                            >
                                <BsCartX size="1.7rem" />
                                Clear Cart
                            </Button>
                            <Button variant="success"
                                className="m-2"
                                onClick={()=> emptyCart()}
                            >
                                <BsCartX size="1.7rem" />
                                Pay now
                            </Button>
                          
                        </Col>
                    </Row>}
            </Row>
        </Container>
    );
};

export default Cart;