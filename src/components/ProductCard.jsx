// src/components/ProductCard.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, isPurchased } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyNow = () => {
    addToCart(product);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000); // hide popup after 2s
  };

  const buttonText = isPurchased(product.id)
    ? "Purchased"
    : isInCart(product.id)
    ? "Added"
    : "Buy Now";

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '250px' }}>
      <img src={product.thumbnail} alt={product.title} width="200" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button 
        onClick={handleBuyNow} 
        disabled={isPurchased(product.id)}
        style={{ backgroundColor: isPurchased(product.id) ? 'gray' : '#007bff', color: 'white', padding: '5px' }}
      >
        {buttonText}
      </button>

      {showPopup && (
        <div style={{
          position: 'absolute',
          backgroundColor: 'black',
          color: 'white',
          padding: '5px 10px',
          marginTop: '5px',
          borderRadius: '5px'
        }}>
          Product added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
