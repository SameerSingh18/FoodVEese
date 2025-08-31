import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const recipeData = recipe.recipe || recipe;
  const { idMeal, strMeal, strMealThumb } = recipeData;

  // Local state for liked or not
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if this recipe is in favorites on mount
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setLiked(favorites.some(fav => fav.idMeal === idMeal));
  }, [idMeal]);

  const toggleLike = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (liked) {
      // Remove from favorites
      favorites = favorites.filter(fav => fav.idMeal !== idMeal);
    } else {
      // Add to favorites
      favorites.push(recipeData);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setLiked(!liked);
  };

  return (
    <div className='w-full md:w-[220px] bg-gray-900 rounded-lg shadow relative'>
      <Link to={`/recipes/${idMeal}`}>
        <img src={strMealThumb} alt={strMeal} className='rounded-t-lg h-[150px] w-full object-cover' />
        <div className='p-3'>
          <p className='text-white font-semibold'>{strMeal}</p>
        </div>
      </Link>

      <button
        onClick={toggleLike}
        className={`absolute top-2 right-2 p-1 rounded-full ${
          liked ? 'bg-red-600' : 'bg-gray-600'
        } text-white`}
        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
      >
        {liked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default RecipeCard;
