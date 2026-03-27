import React from 'react';
import './Header.css';
import { ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">
            <ChefHat size={28} />
          </div>
          <h1 className="title-gradient logo-text">Culinary AI</h1>
        </div>
        <nav className="header-nav">
          <a href="#discover" className="nav-link">Discover</a>
          <a href="#saved" className="nav-link">Saved Recipes</a>
          <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
