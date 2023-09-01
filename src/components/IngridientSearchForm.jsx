import axios from "axios";
import  { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setMeals, setMatchingMeals } from "../utils/mealSlice";
import { useNavigate } from "react-router-dom";



export const IngridientSearchForm = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [mealList, setmealList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Display 100 items per page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meals = useSelector((state) => state.meal.meals);
  const mealsList=useSelector((state)=>state.meal.matchingMeals);
  const [ingredient, setIngredient] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );

        const sortedIngredients = response.data.meals.sort((a, b) =>
          a.strIngredient.localeCompare(b.strIngredient)
        );
        dispatch(setMeals(sortedIngredients));

        setRecipeList(sortedIngredients);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log(mealsList);
  }, [mealsList]);
  

  const fetchRecipeList = async () => {
    try {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient
      );
      const jsondata=await data.json();
      dispatch(setMatchingMeals(jsondata));
      setmealList(jsondata);
    } catch (err) {
      console.log(err);
    }
  };
  
  const onSearch = () => {
      let new_ingredient=ingredient.replace(/ /g,"_");
      setIngredient(new_ingredient);
      fetchRecipeList();
      navigate("recipe-list");
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meals.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Ingredient List</h1>
        <div className="flex ml-60 mb-4 mt-4">
            <input className="px-4 py-2 border rounded-l focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Search ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}></input>
            <button
              onClick={onSearch}
             className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700">Search</button>
        </div>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((ingredient) => (
            <li key={ingredient.idIngredient} className="border p-2 rounded">
              {ingredient.strIngredient}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          {/* Pagination */}
          <nav className="flex">
            {Array.from({ length: Math.ceil(recipeList.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
