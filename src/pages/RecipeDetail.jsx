// RecipeDetail.jsx me
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMealById } from "../utils";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { AiFillPushpin } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await fetchMealById(id);
      setRecipe(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading || !recipe) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header title={recipe.strMeal} image={recipe.strMealThumb} />

      <div className="w-full px-4 lg:px-20 pt-5">
        <div className="flex gap-10 items-center justify-center px-4">
          <div className="flex flex-col justify-between">
            <span className="text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2">
              Calories: N/A {/* MealDB doesn't provide calories */}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">CALORIES</p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2">
              {recipe.strArea}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">CUISINE</p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2">
              {recipe.strCategory}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">CATEGORY</p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 py-20 md:px-10">
          {/* LEFT SIDE */}
          <div className="w-full md:w-2/4 md:border-r border-slate-800 pr-1">
            <div className="flex flex-col gap-5">
              <p className="text-green-500 text-2xl underline">Ingredients</p>
              {[...Array(20)].map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <p key={i} className="text-neutral-100 flex gap-2">
                      <AiFillPushpin className="text-green-800 text-xl" />
                      {measure} {ingredient}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            <div className="flex flex-col gap-3 mt-20">
              <p className="text-green-700 text-2xl underline">Instructions</p>
              <p className="text-neutral-100">{recipe.strInstructions}</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex flex-col items-center gap-4 p-4 rounded-lg shadow-lg bg-[#00000043] w-full max-w-md">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-lg w-full"
            />

            <p className="text-neutral-200">{recipe.strTags}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
