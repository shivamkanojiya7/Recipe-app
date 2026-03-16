import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { Loader } from "lucide-react";
const Searchview = ({ meals, loading }) => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="text-yellow-400 hover:text-yellow-300 flex items-center font-medium transition text-lg group mb-6"
        >
          <ChevronLeft className="w-6 h-6 mr-1" />
          Back to Dashboard
        </Link>
        {loading && (
          <div className="text-center p-8 text-gray-300">
            <Loader className="animate-spin inline-block mr-2 text-blue-400" />
            searching the database...
          </div>
        )}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {meals.map((meal, index) => (
              <RecipeCard key={index} meal={meal} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
export default Searchview;
