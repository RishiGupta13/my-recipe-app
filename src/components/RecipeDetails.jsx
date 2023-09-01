import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addRecipeDetail } from "../utils/mealSlice";
import { useDispatch, useSelector } from "react-redux";

export const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchRecipeDetail = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const jsonData = await response.json();
      dispatch(addRecipeDetail(jsonData));
      setLoading(false); // Set loading to false after successfully fetching data
    } catch (error) {
      console.error("Error fetching recipe detail:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchRecipeDetail();
  }, []);

  const recipeData = useSelector((store) => store.meal.recipeDetails[0]);
  const recipe = recipeData?.meals || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3">
        {loading ? ( // Show loading message while fetching data
          <div className="flex items-center justify-center h-48">
            <h1 className="text-lg text-gray-600">Loading recipe details...</h1>
          </div>
        ) : recipe.length ? ( // Check if there are recipes to display
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">
              Recipe Details for: {recipe[0].strMeal}
            </h1>
            <img
              src={recipe[0].strMealThumb}
              alt={recipe[0].strMeal}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{recipe[0].strMeal}</p>
              <p className="mb-2">
                <strong>Instructions:</strong>
              </p>
              <p>{recipe[0].strInstructions}</p>
              <p className="mt-4">
                <strong>Category:</strong> {recipe[0].strCategory}
              </p>
              <p>
                <strong>Area:</strong> {recipe[0].strArea}
              </p>
              {recipe[0].strYoutube && (
                <p className="mt-4">
                  <strong>Watch on YouTube:</strong>{" "}
                  <a
                    href={recipe[0].strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline"
                  >
                    Click here
                  </a>
                </p>
              )}
            </div>
          </div>
        ) : (
          // Display a message when no recipe is found
          <div className="flex items-center justify-center h-48">
            <h1 className="text-lg text-gray-600">No recipe found for this ID.</h1>
          </div>
        )}
      </div>
    </div>
  );
};
