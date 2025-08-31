// utils/index.js

export const fetchCategories = async () => {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const json = await res.json();
    return json.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchMealsByCategory = async (category) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await res.json();
    return json.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};

// Yeh function missing tha, ab add kar diya:
export const fetchMealById = async (id) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await res.json();
    return json.meals ? json.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
};
