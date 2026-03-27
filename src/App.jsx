import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IngredientSearch from './components/IngredientSearch';
import RecipeList from './components/RecipeList';
import RecipeDetailsModal from './components/RecipeDetailsModal';
import { searchByIngredients } from './services/api';
import './styles/components.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const results = await searchByIngredients(ingredients);
      setRecipes(results);
    } catch (error) {
      console.error("Failed to search recipes:", error);
      // Fallback state or error toast can go here
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (id) => {
    setSelectedRecipeId(id);
  };

  const closeRecipeModal = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '0', maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Hero>
            <IngredientSearch onSearch={handleSearch} />
          </Hero>
          
          <RecipeList 
            recipes={recipes} 
            loading={loading} 
            hasSearched={hasSearched}
            onRecipeClick={handleRecipeClick}
          />
        </div>
      </main>

      {selectedRecipeId && (
        <RecipeDetailsModal 
          recipeId={selectedRecipeId} 
          onClose={closeRecipeModal} 
        />
      )}
    </div>
  );
}

export default App;

