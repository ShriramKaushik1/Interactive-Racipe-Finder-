import React, { useEffect, useState } from 'react';
import { X, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { getRecipeDetails } from '../services/api';
import './RecipeDetailsModal.css';

const RecipeDetailsModal = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailedRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeDetails(recipeId);
        setRecipe(data);
      } catch (err) {
        setError("Could not load recipe details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedRecipe();
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [recipeId]);

  if (!recipeId) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="btn-close modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {loading && (
          <div className="modal-loading-state">
            <div className="loader animate-spin"></div>
            <p>Loading details...</p>
          </div>
        )}

        {error && (
          <div className="modal-error-state">
            <XCircle className="error-icon" size={48} />
            <p>{error}</p>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        )}

        {recipe && !loading && !error && (
          <div className="recipe-details-wrapper animate-fade-in">
            <div className="modal-header">
              <img src={recipe.image} alt={recipe.title} className="modal-hero-image" />
              <div className="modal-hero-overlay">
                <h2 className="modal-title">{recipe.title}</h2>
                <div className="modal-meta">
                  <span className="meta-item"><Clock size={16}/> {recipe.readyInMinutes || '?'} mins</span>
                  <span className="meta-item"><Users size={16}/> {recipe.servings || '?'} servings</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

              <div className="recipe-sections">
                <div className="ingredients-section">
                  <h3>Ingredients</h3>
                  <ul className="ingredient-list">
                    {recipe.extendedIngredients?.map((item, i) => (
                      <li key={i} className="ingredient-list-item">
                        <CheckCircle size={16} className="text-success" />
                        <span>{item.original}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="instructions-section">
                  <h3>Instructions</h3>
                  {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                    <ol className="instruction-list">
                      {recipe.analyzedInstructions[0].steps.map((step, i) => (
                        <li key={i} className="instruction-step">
                          <span className="step-number">{step.number}</span>
                          <p>{step.step}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="no-instructions">No detailed instructions available for this recipe.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsModal;
