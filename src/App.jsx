import "./App.css";
import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import RecipeDetailView from "./assets/components/RecipeDetailView";
import Searchview from "./assets/components/Searchview";
import Cuzine from "./assets/components/Cuzine";
import Home from "./assets/components/Home";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";
function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error:${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe],
  );

const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe],
  );

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error:${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 text-gray-100">
          <Navbar handleSearch={handleSearch} />
          <Cuzine  filterByArea={filterByArea}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/receipe/:id" element={<RecipeDetailView />} />
            <Route
              path="/search/:query"
              element={
                <Searchview meals={searchResult} loading={searchLoading} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
