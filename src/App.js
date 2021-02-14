import React, { useEffect, useState } from "react";
import "./App.css";
//import components
import Recipe from "./Recipe";
import HashLoader from "react-spinners/HashLoader";

const App = () => {
  const [Loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    setLoading(true);
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
      setLoading(false);
    };

    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className='App'>
      {Loading ? (
        <div className='loading'>
          <HashLoader color={"#a18cd1"} loading={Loading} size={150} />
        </div>
      ) : (
        <div>
          <form onSubmit={getSearch} className='search-form'>
            <input
              className='search-bar'
              type='text'
              value={search}
              onChange={updateSearch}
            />
            <button className='search-button' type='submit'>
              Search
            </button>
          </form>
          <div className='recipes'>
            {recipes.map((recipe) => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
