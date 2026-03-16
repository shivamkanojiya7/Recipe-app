import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import { Loader, ChevronLeft, Utensils } from "lucide-react";
import { API_URL } from "./useFetch";

const RecipeDetailView = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`${API_URL}lookup.php?i=${id}`);
  const meal = data?.meals?.[0];

  if (loading)
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-blue-400" />
        Preparing your recipe card...
      </div>
    );


  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
     
      <Link
        to="/"
        className="text-yellow-400 hover:text-yellow-300 flex items-center font-medium transition text-lg group mb-6"
      >
        <ChevronLeft className="w-6 h-6 mr-1" />
        Back to Dashboard
      </Link>

      <div className="bg-gray-900 p-6 md:p-10 rounded-3xl shadow-2xl shadow-black/70 border border-gray-800">


        <div className="lg:flex lg:space-x-12">

          
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl font-black text-gray-100 mb-6 leading-tight">
              {meal?.strMeal}
            </h1>

            <img
              src={meal?.strMealThumb}
              alt={meal?.strMeal}
              className="w-[400px] h-[400px] rounded-xl shadow-2xl shadow-black/50 object-cover border-4 border-gray-800 ring-2 ring-blue-500/50"
            />
          </div>

          
          <div className="lg:w-1/2 bg-gray-800 rounded-xl shadow-inner shadow-black/30 border border-gray-700 pb-5">

            <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center border-b border-gray-700 pb-3 px-4 pt-4">
              <Utensils className="w-7 h-7 mr-3 text-blue-500" />
              Key Ingredients
            </h2>

          
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 px-4 py-2">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-300 text-base"
                >
                  <span className="text-blue-400 font-semibold mr-2">
                    {item.measure}
                  </span>
                  <span>{item.ingredient}</span>
                </li>
              ))}
            </ul>


            <div className="flex gap-3 mt-4 px-4">
              {meal?.strCategory && (
                <span className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                  {meal.strCategory}
                </span>
              )}

              {meal?.strArea && (
                <span className="bg-green-600/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold border border-green-500/30">
                  {meal.strArea}
                </span>
              )}
            </div>

          </div>
        </div>
        <div className="mt-10 bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Cooking Instructions
          </h2>

          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {meal?.strInstructions}
          </p>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetailView;