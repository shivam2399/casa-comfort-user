import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state) => state.cart.items.length);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="header">
      <div className="header-logo">Blink that</div>
      <div className="header-search">
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <nav className="header-nav">
        <button className="cart-button" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
        </button>
      </nav>
    </header>
  );
};

export default Header;
