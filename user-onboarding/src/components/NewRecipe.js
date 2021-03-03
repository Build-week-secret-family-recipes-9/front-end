import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const NewRecipe = () => {
  const [formState, setFormState] = useState({
    Title: "",
    Source: "",
    Ingredients: "",
    Instructions: "",
    Category: "",
    Img: "",
  });

  const [errors, setErrors] = useState({
    Title: "",
    Source: "",
    Ingredients: "",
    Instructions: "",
    Category: "",
    Img: "",
    message: "",
  });

  const { push } = useHistory();

  const recipeSchema = yup.object().shape({
    Title: yup.string().required("Recipe needs a title"),

    Source: yup.string().required("Recipe needs a source"),

    Ingredients: yup.string().required("Recipe needs at least one ingredient"),

    Instructions: yup.string().required("Recipe needs instructions"),

    Category: yup.string().required("Recipe needs a category"),

    Img: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
  });

  // recipeSchema.isValid({
  //   Title: "Apples",
  //   Source: "Grandma",
  //   Ingredients: "4-6 Apples",
  //   Instructions:
  //     "Slice apples, removing the core and stem. Serve apples on a plate",
  //   Category: "Snack",
  //   Img:
  //     "https://th.bing.com/th/id/R0bfc9b8b90712940018a452f9cadb9dd?rik=rAeASh9rTmhBqg&riu=http%3a%2f%2flifeinleggings.com%2fwp-content%2fuploads%2f2013%2f09%2fapples-slices-1024x806.jpg&ehk=BpEjfxAdcU9luSjh0U5mN4dh3uCJqG5ngTjvZavuNZk%3d&risl=&pid=ImgRaw",
  // });

  const validateChange = (event) => {
    yup
      .reach(recipeSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({ ...errors });
      })
      .catch((err) =>
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        })
      );
  };

  const clearErrors = () => {
    setTimeout(() => {
      console.log("trying to clear");
      setErrors({
        Title: "",
        Source: "",
        Ingredients: "",
        Instructions: "",
        Category: "",
        Img: "",
        message: "",
      });
    }, 5000);
  };

  const changeHandler = (event) => {
    event.persist();
    const FormData = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    validateChange(event);
    setFormState(FormData);
    clearErrors();
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = await recipeSchema.isValid(formState);
      if (!isValid) {
        setErrors({ ...errors, message: "Please fill out required fields" });
        return clearErrors();
      }
      const resp = await axiosWithAuth().post(
        "http://localhost:4200/api/posts",
        formState
      );
      console.log(resp.data);
      push("/recipes");
    } catch (err) {
      console.log(err);
      setErrors({ ...errors, message: "Account information not valid" });
      clearErrors();
    }
  };

  return (
    <div>
      <h2>Add a recipe!</h2>
      <form onSubmit={formSubmit}>
        <label htmlFor="img">
          Image
          <input
            id="img"
            type="text"
            name="Img"
            value={formState.Img}
            onChange={changeHandler}
          />
          {errors.Img.length > 0 ? <p className="error">{errors.Img}</p> : null}
          <br />
        </label>
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            name="Title"
            value={formState.Title}
            onChange={changeHandler}
          />
          {errors.Title.length > 0 ? (
            <p className="error">{errors.Title}</p>
          ) : null}
          <br />
        </label>
        <label htmlFor="source">
          Source
          <input
            id="source"
            type="text"
            name="Source"
            value={formState.Source}
            onChange={changeHandler}
          />
          {errors.Source.length > 0 ? (
            <p className="error">{errors.Source}</p>
          ) : null}
          <br />
        </label>
        <label htmlFor="ingredients">
          Ingredients
          <input
            id="ingredients"
            type="text"
            name="Ingredients"
            value={formState.Ingredients}
            onChange={changeHandler}
          />
          {errors.Ingredients.length > 0 ? (
            <p className="error">{errors.Ingredients}</p>
          ) : null}
          <br />
        </label>
        <label htmlFor="instructions">
          Instructions
          <input
            id="instructions"
            type="text"
            name="Instructions"
            value={formState.Instructions}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="category">
          Category
          <input
            id="category"
            type="text"
            name="Category"
            value={formState.Category}
            onChange={changeHandler}
          />
          {errors.Category.length > 0 ? (
            <p className="error">{errors.Category}</p>
          ) : null}
          <br />
        </label>
        <button type="submit">Submit Recipe!</button>
        {errors.message.length > 0 ? (
          <p className="error">{errors.message}</p>
        ) : null}
      </form>
    </div>
  );
};

export default NewRecipe;
