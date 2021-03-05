import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { RecipesContext } from "../contexts/RecipesContext";

const RecipeList = () => {
  const { recipeList, setRecipeList, deleteRecipe } = useContext(
    RecipesContext
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState({});
  const { push } = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("localhost:3000") // change to GET endpoint
      .then((res) => {
        console.log(res);
        setRecipeList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredRecipeList = (e) => {
    console.log(e.target.value);

    if (e.target.value.length === 1 && e.key === "Backspace") {
      return setFilteredRecipes([]);
    }
    let filteredTitle = "";
    let filteredSource = "";
    let filteredCategory = "";
    if (e.target.value === "") {
      filteredTitle = e.key;
      filteredCategory = e.key;
      filteredSource = e.key;
    } else {
      filteredTitle = e.target.value;
      filteredCategory = e.target.value;
      filteredSource = e.target.value;
    }
    console.log(filteredTitle);
    const filteredList = recipeList.filter((item) => {
      if (
        item.title.toLowerCase().includes(filteredTitle) ||
        item.source.toLowerCase().includes(filteredSource) ||
        item.category.toLowerCase().includes(filteredCategory)
      ) {
        return item;
      }
      return null;
    });
    setFilteredRecipes(filteredList);
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
          onKeyDown={filteredRecipeList}
          tabIndex="0"
        />
      </form>
      <div>
        {/* MAP method over recipeList to display the recipes */}
        {filteredRecipes.length > 0
          ? filteredRecipes.map((item) => {
              return (
                <div className="recipe-card">
                  <h2>{item.title}</h2>
                  <h3>{item.source}</h3>
                  <p>{item.ingredients}</p>
                  <p>{item.instructions}</p>
                  <h4>{item.category}</h4>
                  <img href={item.img} alt={item.title} />
                  <button
                    onClick={() => push(`endpoint/edit-recipe/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={deleteRecipe}>Delete</button>
                </div>
              );
            })
          : recipeList.map((item) => {
              return (
                <div className="recipe-card">
                  <h2>{item.title}</h2>
                  <h3>{item.source}</h3>
                  <p>{item.ingredients}</p>
                  <p>{item.instructions}</p>
                  <h4>{item.category}</h4>
                  <img href={item.img} alt={item.title} />
                  <button
                    onClick={() => push(`endpoint/edit-recipe/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={deleteRecipe}>Delete</button>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default RecipeList;
