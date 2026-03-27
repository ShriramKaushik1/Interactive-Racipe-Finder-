import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import './IngredientSearch.css';

const IngredientSearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Prevent duplicates
    const normalizedInput = inputValue.trim().toLowerCase();
    if (!ingredients.includes(normalizedInput)) {
      setIngredients([...ingredients, normalizedInput]);
    }
    
    setInputValue('');
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleAddIngredient(e);
    }
  };

  return (
    <div className="ingredient-search-wrapper glass-panel">
      <form onSubmit={handleAddIngredient} className="search-input-group">
        <div className="input-icon-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="ingredient-input"
            placeholder="What's in your fridge? (e.g. chicken, rice, tomato)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button type="submit" className="btn-add" disabled={!inputValue.trim()}>
          <Plus size={20} />
          <span>Add</span>
        </button>
      </form>

      {ingredients.length > 0 && (
        <div className="ingredients-list">
          {ingredients.map((ing, index) => (
            <span key={index} className="ingredient-tag animate-fade-in">
              {ing}
              <button 
                type="button" 
                onClick={() => removeIngredient(ing)}
                className="btn-remove-tag"
                aria-label={`Remove ${ing}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      <button 
        className="btn-primary search-action-btn"
        onClick={handleSearch}
        disabled={ingredients.length === 0}
      >
        <Search size={20} />
        Find Recipes
      </button>
    </div>
  );
};

export default IngredientSearch;
