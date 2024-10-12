import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import StripeProvider from "./StripeProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StripeProvider>
    <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
  </StripeProvider>
);

