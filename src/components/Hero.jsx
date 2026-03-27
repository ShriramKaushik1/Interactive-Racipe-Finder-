import React from 'react';
import './Hero.css';

const Hero = ({ children }) => {
  return (
    <section className="hero-section">
      <div className="hero-content animate-fade-in">
        <div className="badge badge-success" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
          ✨ AI-Powered Recipe Suggestions
        </div>
        <h1 className="hero-title">
          Cook smarter, not harder with <span className="title-gradient">Culinary AI</span>
        </h1>
        <p className="hero-subtitle">
          Don't know what to cook? Enter the ingredients you have on hand, and we'll instantly generate incredibly delicious recipes for you to try. Minimize waste, maximize flavor.
        </p>
        
        {/* The search component will be passed as children here for better composition */}
        <div className="hero-search-container">
          {children}
        </div>
      </div>
      
      <div className="hero-graphics">
        {/* We can add abstract floating shapes or an image here */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="glass-panel floating-card card-1">
          <div className="card-skeleton skeleton-img"></div>
          <div className="card-skeleton skeleton-text"></div>
          <div className="card-skeleton skeleton-text short"></div>
        </div>
        <div className="glass-panel floating-card card-2">
          <div className="card-skeleton skeleton-img"></div>
          <div className="card-skeleton skeleton-text"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
