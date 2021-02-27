import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { RecipesContext } from "../contexts/RecipesContext";

const RecipeList = () => {
  const { recipeList, setRecipeList, deleteRecipe } = useContext(
    RecipesContext
  );
  useEffect(() => {
    axiosWithAuth()
      .get("localhost:3000") // change to GET endpoint
      .then((res) => {
        console.log(res);
        setRecipeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>// MAP method over recipeList to display the recipes</div>
    </div>
  );
};

export default RecipeList;
