import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductsPage';
import PaymentPage from './pages/PaymentPage';
import { CartProvider } from './components/CartContext';


function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
