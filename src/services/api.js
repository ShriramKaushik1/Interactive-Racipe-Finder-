const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Mock data for development and testing without an API key
const MOCK_RECIPES = [
  {
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 3,
    likes: 209
  },
  {
    id: 715538,
    title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
    image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
    usedIngredientCount: 1,
    missedIngredientCount: 4,
    likes: 421
  },
  {
    id: 642583,
    title: "Farfalle with Peas, Ham and Cream",
    image: "https://spoonacular.com/recipeImages/642583-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    likes: 154
  }
];

const MOCK_RECIPE_DETAILS = {
  id: 716429,
  title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
  readyInMinutes: 45,
  servings: 2,
  summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for. This recipe makes 2 servings with <b>543 calories</b>, <b>17g of protein</b>, and <b>22g of fat</b> each.",
  extendedIngredients: [
    { id: 10011135, original: "1/2 cup cauliflower florets" },
    { id: 11215, original: "2 cloves garlic, minced" },
    { id: 11291, original: "3 scallions, chopped" },
    { id: 18079, original: "1/4 cup breadcrumbs" },
    { id: 20420, original: "8 oz pasta" }
  ],
  analyzedInstructions: [
    {
      name: "",
      steps: [
        { number: 1, step: "Cook pasta in a large pot of boiling water until al dente." },
        { number: 2, step: "Meanwhile, heat olive oil in a large skillet over medium heat. Add garlic and scallions." },
        { number: 3, step: "Add cauliflower and cook until tender." },
        { number: 4, step: "Toss pasta with the cauliflower mixture and sprinkle with breadcrumbs." }
      ]
    }
  ]
};

export const searchByIngredients = async (ingredients) => {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    console.warn('Using mock data since valid API key was not found.');
    return new Promise(resolve => setTimeout(() => resolve(MOCK_RECIPES), 1000));
  }

  const ingredientsString = ingredients.join(',+');
  const url = `${BASE_URL}/findByIngredients?ingredients=${ingredientsString}&number=9&ranking=2&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Fallback to mock data if API limits are reached
      if (response.status === 402 || response.status === 401) {
        console.warn('API quota reached or invalid key. Falling back to mock data.');
        return MOCK_RECIPES;
      }
      throw new Error('Failed to fetch recipes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    // Silent fallback to mock data on network errors for demonstration purposes
    return MOCK_RECIPES;
  }
};

export const getRecipeDetails = async (recipeId) => {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_RECIPE_DETAILS), 800));
  }

  const url = `${BASE_URL}/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 402 || response.status === 401) {
        return MOCK_RECIPE_DETAILS;
      }
      throw new Error('Failed to fetch recipe details');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching recipe ${recipeId}:`, error);
    return MOCK_RECIPE_DETAILS;
  }
};
