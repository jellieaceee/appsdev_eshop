import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../App.css';

const ProductPage = () => {
  const { addToCart, isInCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <div>No product selected.</div>;
  }

  const handleAddToCart = () => {
    const added = addToCart(product);
    if (added) {
      alert('Product added to cart!');
    } else {
      alert('Product is already in cart.');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="product-page">
      <div className="product-detail-card">
        <img src={product.thumbnail} alt={product.title} />

        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description || 'No description available'}</p>
          <p className="price">${product.price}</p>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={isInCart(product.id)}
              className="add-cart"
            >
              {isInCart(product.id) ? 'Already in Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={handleCheckout}
              className="buy-now"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
