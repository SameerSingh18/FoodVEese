import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import Searchbar from './SearchBar';
import RecipeCard from './RecipeCard';
import Loading from './Loading';
import { fetchMealsByCategory } from '../utils';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('Beef'); // default search
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchMealsByCategory(query.trim());
      setRecipes(data);
    } catch (err) {
      setError('Failed to fetch recipes. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data on mount
  useEffect(() => {
    handleSearch(new Event('submit'));
  }, []);

  return (
    <div className="w-full px-4 md:px-20 py-10">
      <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-10">
        <Searchbar
          placeholder="Search meals by category (e.g. Beef, Vegan)"
          value={query}
          handleInputChange={handleInputChange}
          rightIcon={<BiSearchAlt2 onClick={handleSearch} />}
        />
      </form>

      {loading && <Loading />}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!loading && recipes.length === 0 && (
        <p className="text-center text-gray-400">No recipes found for "{query}".</p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
