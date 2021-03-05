import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { RecipesContext } from "../contexts/RecipesContext";

const RecipeList = () => {
  const { recipeList, setRecipeList, deleteRecipe } = useContext(
    RecipesContext
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState();
  const { push } = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("http://localhost:5075/api/recipes")
      .then((res) => {
        console.log(res);
        setRecipeList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error({ err });
      }, []);
  });

  const filteredRecipeList = (e) => {
    if (e.target.value.length === 1 && e.key === "Backspace") {
      return setFilteredRecipes([]);
    }
    let filteredItems = "";

    if (e.target.value === "") {
      filteredItems = e.key;
    } else {
      filteredItems = e.target.value;
    }
    let filteredList = recipeList.map((recipe) => {
      const searchItems = [recipe.title, recipe.category, recipe.source];
      let lastAddedItem;
      let searchResults = searchItems.map((item) => {
        if (item.toLowerCase().includes(filteredItems)) {
          if (lastAddedItem !== recipe) {
            lastAddedItem = recipe;
            return recipe;
          }
        }
        return searchResults;
      });
      searchResults = searchResults.filter((item) => item !== undefined);
      if (searchResults.length < 1) {
        return;
      } else {
        return searchResults;
      }
    });
    filteredList = filteredList.filter((item) => item !== undefined);

    setFilteredRecipes(...filteredList);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form>
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          onKeyDown={(e) => filteredRecipeList(e)}
          tabIndex="0"
        />
      </form>
      <h3>
        Want to add a recipe? <Link to="/add-recipe">Add new recipe</Link>
      </h3>
      <div>
        {/* MAP method over recipeList to display the recipes */}
        {filteredRecipes?.length > 0
          ? filteredRecipes?.map((item) => {
              console.log(item);
              return (
                <div className="recipe-card" key={item.id}>
                  <h2>Title: {item.title}</h2>
                  <h3>Source: {item.source}</h3>
                  <p>Ingredients: {item.ingredients}</p>
                  <p>Instructions: {item.instructions}</p>
                  <h4>Category: {item.category}</h4>
                  <img src={item.img} alt={item.title} />
                  <br />
                  <button onClick={() => push(`edit-recipe/${item.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => deleteRecipe(item.id)}>Delete</button>
                </div>
              );
            })
          : recipeList.map((item) => {
              return (
                <div className="recipe-card" key={item.id}>
                  <h2>Title: {item.title}</h2>
                  <h3>Source: {item.source}</h3>
                  <p>Ingredients: {item.ingredients}</p>
                  <p>Instructions: {item.instructions}</p>
                  <h4>Category: {item.category}</h4>
                  <img src={item.img} alt={item.title} />
                  <br />
                  <button onClick={() => push(`edit-recipe/${item.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => deleteRecipe(item.id)}>Delete</button>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default RecipeList;
