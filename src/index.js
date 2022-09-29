import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DataFetchProvider from './context/DataFetch';
import CartDataProvider from './context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataFetchProvider>
      <CartDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartDataProvider>
    </DataFetchProvider>
  </React.StrictMode>
);

