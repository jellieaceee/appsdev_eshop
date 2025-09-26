import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../App.css';

const Checkout = () => {
  const { purchaseProduct } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="checkout-container">
        <div className="checkout-card">
          <p>No product selected.</p>
        </div>
      </div>
    );
  }

  const handleConfirmCOD = () => {
    purchaseProduct(product);
    alert('✅ Thank you for purchasing! Your product will be delivered soon.');
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2>Checkout (COD)</h2>
        <div className="checkout-item">
          <img src={product.thumbnail} alt={product.title} />
          <div>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        </div>

        <p className="checkout-total">Total: ${product.price}</p>

        <button onClick={handleConfirmCOD} className="pay-cod-btn">
          Pay COD
        </button>
      </div>
    </div>
  );
};

export default Checkout;
