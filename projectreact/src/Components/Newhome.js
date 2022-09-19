import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useThemeHook} from './Theme';
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import Product from '../Components/Product';
import { CartProvider,useCart } from 'react-use-cart';
import Newproduct from './Newproduct';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [theme] = useThemeHook();
    const navigate=useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);

    async function getResponse(){
        const res = await fetch('https://localhost:7027/api/Product')
                          .then(res=> res.json());
                          setProductData(await res);
    }

    useEffect(()=>{
        getResponse();
    },[]);

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                <div >
            <h1>Add Products</h1>
            <div >
                <button  onClick={()=>{navigate("/crudCreate")}} >Add Product</button>
                </div>
            </div>
                    <h1 className={theme? 'text-light my-5': 'text-black my-5'}>Search products</h1>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={theme? 'bg-black text-dark-primary': 'bg-light text-light-primary'}>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
                        <FormControl 
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className={theme? 'bg-light-black text-light': 'bg-light text-black'}
                        />
                    </InputGroup>
                </Col>
                
                
                <SearchFilter 
                    value={searchInput}
                    data={productData}
                    renderResults={results =>(
                        <Row className="justify-content-center">
                            {results.map((item, i)=>(
                                <Newproduct data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
                
            </Row>
        </Container>
    );
};

export default Home;