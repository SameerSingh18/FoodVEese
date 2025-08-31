import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-wrap justify-center gap-6">
      {favorites.length === 0 ? (
        <p className="text-white text-xl">No favorites yet. Like some recipes!</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.idMeal} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <RecipeCard recipe={recipe} />
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
