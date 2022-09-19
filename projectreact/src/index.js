import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Theme } from './Components/Theme';
import { CartProvider } from 'react-use-cart';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';


render(
  <React.StrictMode>
    <Theme>
      <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();