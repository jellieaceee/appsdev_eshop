// src/pages/ProductPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProductById(id).then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} width="300" />
      <p>{product.description}</p>
      <p><b>Brand:</b> {product.brand}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Rating:</b> {product.rating}</p>
      <p><b>Stock:</b> {product.stock}</p>
      <p><b>Price:</b> ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
