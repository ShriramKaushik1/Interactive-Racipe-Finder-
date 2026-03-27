import React from 'react';
import { Clock, Users, Heart } from 'lucide-react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card glass-panel animate-fade-in" onClick={() => onClick(recipe.id)}>
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" loading="lazy" />
        <div className="recipe-overlay">
          <button className="btn-icon favorite-btn" aria-label="Save recipe" onClick={(e) => { e.stopPropagation(); }}>
            <Heart size={20} />
          </button>
        </div>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        
        <div className="recipe-stats">
          <span className="stat-item" title="Used ingredients">
            <span className="stat-dot dot-success"></span>
            {recipe.usedIngredientCount} Used
          </span>
          <span className="stat-item" title="Missing ingredients">
            <span className="stat-dot dot-error"></span>
            {recipe.missedIngredientCount} Missing
          </span>
        </div>
        
        <div className="recipe-footer">
          <button className="view-recipe-btn">View Full Recipe &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
