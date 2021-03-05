import React, { useContext, useState, useEffect } from "react";
import { RecipesContext } from "../contexts/RecipesContext";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "",
  img: "",
};

const UpdateRecipe = () => {
  const { recipeList, setRecipeList } = useContext(RecipesContext);
  const [recipeToUpdate, setRecipeToUpdate] = useState(initialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    // make axios GET request to endpoint with id and setRecipe(res.data)
    axios
      .get(`localhost:3000/api/auth/${id}`)
      .then((res) => {
        console.log(res.data);
        setRecipeToUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    setRecipeToUpdate({ ...recipeToUpdate, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // make axios PUT request to endpoint with id and setRecipeList
    // with map method returning res.data if id's match
    // push to ('/recipes')
    axiosWithAuth()
      .put(`localhost:3000/api/auth/${id}`, recipeToUpdate)
      .then((res) => {
        console.log(res);
        setRecipeList(
          recipeList.map((item) => {
            if (item.id === id) {
              return res.data;
            } else {
              return item;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    push("/recipes");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="title"
          name="title"
          value={recipeToUpdate.title}
          onChange={changeHandler}
        />
        <input
          placeholder="source"
          name="source"
          value={recipeToUpdate.source}
          onChange={changeHandler}
        />
        <input
          placeholder="ingredients"
          name="ingredients"
          value={recipeToUpdate.ingredients}
          onChange={changeHandler}
        />
        <input
          placeholder="instructions"
          name="instructions"
          value={recipeToUpdate.instructions}
          onChange={changeHandler}
        />
        <input
          placeholder="category"
          name="category"
          value={recipeToUpdate.category}
          onChange={changeHandler}
        />
        <input
          placeholder="img"
          name="img"
          value={recipeToUpdate.img}
          onChange={changeHandler}
        />
        <button>Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
