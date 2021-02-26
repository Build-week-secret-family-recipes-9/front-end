import React, { useContext, useState, useEffect } from "react";
import { RecipesContext } from "../contexts/RecipesContext";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

initialState = {
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "",
  img: "",
};

const UpdateRecipe = () => {
  const { recipeList, setRecipeList } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState(initialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    // make axios GET request to endpoint with id and setRecipe(res.data)
  });

  const changeHandler = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // make axios PUT request to endpoint with id and setRecipeList
    // with map method returning res.data if id's match
    // push to ('/recipes')
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="title"
          name="title"
          value={recipe.title}
          onChange={changeHandler}
        />
        <input
          placeholder="source"
          name="source"
          value={recipe.source}
          onChange={changeHandler}
        />
        <input
          placeholder="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={changeHandler}
        />
        <input
          placeholder="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={changeHandler}
        />
        <input
          placeholder="category"
          name="category"
          value={recipe.category}
          onChange={changeHandler}
        />
        <input
          placeholder="img"
          name="img"
          value={recipe.img}
          onChange={changeHandler}
        />
        <button>Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
