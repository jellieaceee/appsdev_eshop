// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../services/api';
import Filters from '../components/Filters';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../App.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();
  const { isInCart, isPurchased } = useContext(CartContext);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setDisplayProducts(data);
    });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setSuggestions([]);
    } else {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  }, [searchTerm, products]);

  const handleSearch = () => {
    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered = sortProducts(filtered, sortOption);
    setDisplayProducts(filtered);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const sortProducts = (list, option) => {
    const sorted = [...list];
    switch (option) {
      case 'a-z': return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a': return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-low-high': return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low': return sorted.sort((a, b) => b.price - a.price);
      case 'latest': return sorted.sort((a, b) => b.id - a.id);
      case 'oldest': return sorted.sort((a, b) => a.id - b.id);
      default: return list;
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    if (e.target.value === '') {
      setDisplayProducts(products);
    } else {
      setDisplayProducts(sortProducts(displayProducts, e.target.value));
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDisplayProducts(products);
    setSuggestions([]);
  };

  return (
    <div className="page-container">
      {/* Search Bar */}
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          {searchTerm && <span className="clear-btn" onClick={clearSearch}>✕</span>}
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map(s => (
                <div key={s.id} onClick={() => { setSearchTerm(s.title); setSuggestions([]); }}>
                  {s.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {/* Sort */}
      <div className="sort-filter-container">
        <div className="sort-container">
          <label>Sort by: </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="a-z">A → Z</option>
            <option value="z-a">Z → A</option>
            <option value="price-low-high">Price: Low → High</option>
            <option value="price-high-low">Price: High → Low</option>
            <option value="latest">Latest → Oldest</option>
            <option value="oldest">Oldest → Latest</option>
          </select>
        </div>

        {/* Filters */}
        <Filters products={products} onFilter={setDisplayProducts} />
      </div>
      <div className='h1'>
        <h1>The Starlink Shop</h1>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {displayProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} className="product-img" />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <button
              onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
              className="buy-btn"
            >
              Buy Now
            </button>
            {isInCart(product.id) && <p className="cart-status">Added to Cart</p>}
            {isPurchased(product.id) && <p className="purchased-status">Purchased</p>}
          </div>
        ))}
      </div>
      <footer style={{
        backgroundColor: '#6cd4f3',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        marginTop: '80px',
      }}>
        <p>© {new Date().getFullYear()} The Starlink Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;