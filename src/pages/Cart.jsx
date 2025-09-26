// src/pages/Cart.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, purchaseProduct } = useContext(CartContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handlePayCOD = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one product to pay.');
      return;
    }

    // Mark selected products as purchased
    selectedIds.forEach(id => {
      const product = cart.find(p => p.id === id);
      if (product) purchaseProduct(product);
    });

    alert('Thank you for purchasing! Your products will be delivered soon.');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Your Cart is empty.</h2>
      </div>
    );
  }

  const totalAmount = cart
    .filter(p => selectedIds.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0)
    .toFixed(2); // 2 decimal points

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Your Cart</h2>

      {cart.map(product => (
        <div
          key={product.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            background: '#fff',
            marginBottom: '20px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease',
          }}
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(product.id)}
            onChange={() => toggleSelect(product.id)}
            style={{ marginRight: '20px', transform: 'scale(1.3)' }}
          />

          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginRight: '20px',
            }}
          />

          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              {product.title}
            </h4>
            <p style={{ fontSize: '1rem', color: '#555', marginBottom: '8px' }}>
              {product.description?.slice(0, 100)}...
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              ${product.price}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: '20px', fontSize: '1.3rem' }}>
        Total: ${totalAmount}
      </h3>

      <button
        onClick={handlePayCOD}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          background: '#2563eb',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: '500',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
      >
        Pay COD
      </button>
    </div>
  );
};

export default Cart;
