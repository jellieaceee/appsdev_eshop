import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  return (
    <nav>
      {/* Left side: Brand */}
      <div className="brand">
        <Link to="/" className="starlink">starlink</Link>
        <Link to="/" className="shop">shop</Link>
      </div>

      {/* Right side: Navigation links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <button onClick={() => navigate('/cart')}>
          Cart ({cart.length})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
