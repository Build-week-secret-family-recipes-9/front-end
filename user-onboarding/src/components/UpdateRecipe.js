import React, { useContext, useState, useEffect } from "react";
import { RecipesContext } from "../contexts/RecipesContext";
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
    axiosWithAuth()
      .get(`http://localhost:5075/api/recipes/${id}`)
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
      .put(`https://reqres.in/api/users/${id}`, recipeToUpdate)
      .then((res) => {
        console.log(res);
        alert("backend does not support put request");
        // setRecipeList(
        //   recipeList.map((item) => {
        //     if (item.id === id) {
        //       return res.data;
        //     } else {
        //       return item;
        //     }
        //   })
        // );
      })
      .catch((err) => {
        console.log(err);
      });
    push("/recipes");
  };
  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFopr="title">Title</label>
        <input
          placeholder="title"
          id="title"
          name="title"
          value={recipeToUpdate.title}
          onChange={changeHandler}
        />
        <br />
        <label htmlFopr="source">Source</label>
        <input
          id="source"
          placeholder="source"
          name="source"
          value={recipeToUpdate.source}
          onChange={changeHandler}
        />
        <br />
        <label htmlFopr="ingredients">Ingredients</label>
        <input
          id="ingredients"
          placeholder="ingredients"
          name="ingredients"
          value={recipeToUpdate.ingredients}
          onChange={changeHandler}
        />
        <br />
        <label htmlFopr="instructions">Instructions</label>
        <input
          id="instructions"
          placeholder="instructions"
          name="instructions"
          value={recipeToUpdate.instructions}
          onChange={changeHandler}
        />
        <br />
        <label htmlFopr="category">Category</label>
        <input
          id="category"
          placeholder="category"
          name="category"
          value={recipeToUpdate.category}
          onChange={changeHandler}
        />
        <br />
        <label htmlFopr="img">Image</label>
        <input
          id="img"
          placeholder="img"
          name="img"
          value={recipeToUpdate.img}
          onChange={changeHandler}
        />
        <br />
        <button>Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
