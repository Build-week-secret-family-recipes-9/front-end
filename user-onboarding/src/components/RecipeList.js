import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeList = () => {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    axios
      .get("localhost:3000") // change to GET endpoint
      .then((res) => {
        console.log(res);
        setRecipeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>// MAP method over recipeList to display the recipes</div>;
};

export default RecipeList;
