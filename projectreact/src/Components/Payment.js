import react, { useState } from 'react';

import { addUser } from '../Service/api';
import { NavLink, useNavigate } from 'react-router-dom';
import style from "../StylesRoute/Create.module.css" ;
import { navigate } from '@reach/router';







const Payment = () => {
    const navigate=useNavigate();

    const paymentalert=()=>{
      alert("payment is successfull");
      navigate('/customerproducts')
    }

    return(
    <div className="maincontainer">
            <div class="container py-5">
              <div class="row">
                <div class="col-lg-7 mx-auto">
                  <div class="bg-white rounded-lg shadow-sm p-5">
                   
                    <ul role="tablist" class="nav bg-light nav-pills rounded-pill nav-fill mb-3">
                      <li class="nav-item">
                        <a data-toggle="pill" href="#nav-tab-card" class="nav-link active rounded-pill">
                                            <i class="fa fa-credit-card"></i>
                                            Credit Card
                                        </a>
                      </li>
                    </ul>
                    
                    <div class="tab-content">
                      
                      <div id="nav-tab-card" class="tab-pane fade show active">
                        <form role="form">
                          <div class="form-group">
                            <label for="username">Full name (on the card)</label>
                            <input type="text" name="username" placeholder="Jassa" required class="form-control" />
                          </div>
                          <div class="form-group">
                            <label for="cardNumber">Card number</label>
                            <div class="input-group">
                              <input type="text" name="cardNumber" placeholder="Your card number" class="form-control" required />
                              <div class="input-group-append">
                                <span class="input-group-text text-muted">
                                                            <i class="fa fa-cc-visa mx-1"></i>
                                                            <i class="fa fa-cc-amex mx-1"></i>
                                                            <i class="fa fa-cc-mastercard mx-1"></i>
                                                        </span>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-8">
                              <div class="form-group">
                                <label><span class="hidden-xs">Expiration</span></label>
                                <div class="input-group">
                                  <input type="number" placeholder="MM" name="" class="form-control" required />
                                  <input type="number" placeholder="YY" name="" class="form-control" required />
                                </div>
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group mb-4">
                                <label data-toggle="tooltip" title="Three-digits code on the back of your card">CVV
                                                            <i class="fa fa-question-circle"></i>
                                                        </label>
                                <input type="text" required class="form-control" />
                              </div>
                            </div>
                          </div>
                          <button type="button" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"  onClick={()=>{paymentalert()}}> Confirm  </button>
                        </form>
                      </div>
                    
                    
                      
                    </div>
                   
                  </div>
                </div>
              </div>
          </div>
        </div>
);
    
}

export default Payment;