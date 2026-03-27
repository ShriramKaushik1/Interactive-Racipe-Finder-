import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, onRecipeClick, loading, hasSearched }) => {
  if (loading) {
    return (
      <div className="recipes-loading">
        <div className="loader animate-spin"></div>
        <p>Curating the perfect recipes for you...</p>
      </div>
    );
  }

  if (hasSearched && (!recipes || recipes.length === 0)) {
    return (
      <div className="recipes-empty glass-panel animate-fade-in">
        <div className="empty-icon">🍽️</div>
        <h3>No recipes found</h3>
        <p>Try reducing your ingredients or adding more common ones.</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <section className="recipes-section animate-fade-in" id="discover">
      <div className="recipes-header">
        <h2 className="section-title">Your Recipe Matches</h2>
        <span className="results-count">{recipes.length} recipes found</span>
      </div>
      
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div key={recipe.id} style={{ animationDelay: `${index * 0.1}s` }} className="fade-in-up">
            <RecipeCard recipe={recipe} onClick={onRecipeClick} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeList;
