import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, purchaseProduct, isPurchased } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = (product) => {
    purchaseProduct(product);
    alert("Thank you for purchasing! Your product will arrive soon.");
    // stay on current page or go back to the previous page if needed
    // navigate(-1); // optional
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.map(product => (
        <div key={product.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <button
            onClick={() => handleCheckout(product)}
            disabled={isPurchased(product.id)}
            style={{ padding: '5px 10px' }}
          >
            {isPurchased(product.id) ? 'Purchased' : 'Check Out'}
          </button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default Cart;
