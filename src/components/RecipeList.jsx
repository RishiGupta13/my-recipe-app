import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMatchingMeals } from "../utils/mealSlice";
import { Link } from "react-router-dom";


export const RecipeList = () => {
  const mealsList = useSelector((state) => state.meal.matchingMeals[0]);
  const meals = mealsList ? mealsList.meals : [];
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (mealsList) {
      const filteredMeals = mealsList.meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(setMatchingMeals({ ingredient: mealsList.ingredient, meals: filteredMeals }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Recipe List for Ingredient: {mealsList ? mealsList.ingredient : ""}
        </h1>
        <div className="flex justify-center mt-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Search Recipes..."
          />
          <button
            onClick={handleSearch}
            className="px-4 rounded-r-lg bg-black text-white font-semibold p-2 uppercase border indigo"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.length > 0 ? (
            meals.map((recipe) => (
                <>
                 <Link key={recipe.idMeal} to={`/recipe-details/${recipe.idMeal}`}><div
                    key={recipe.idMeal}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                    >
                    <img
                        src={recipe.strMealThumb}
                        alt="Meal"
                        className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="p-4">
                        <p className="text-lg font-semibold mb-2">{recipe.strMeal}</p>
                    </div>
                </div>
                </Link>
               </>
            ))
          ) : (
            <div className="flex items-center justify-center h-48">
              <h1 className="text-lg text-gray-600">
                No Recipes found for this ingredient.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
