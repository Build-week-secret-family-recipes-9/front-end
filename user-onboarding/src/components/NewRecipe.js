import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const NewRecipe = () => {
  const [formState, setFormState] = useState({
    title: "",
    source: "",
    ingredients: "",
    instructions: "",
    category: "",
    img: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    source: "",
    ingredients: "",
    instructions: "",
    category: "",
    img: "",
    message: "",
  });

  const { push } = useHistory();

  const recipeSchema = yup.object().shape({
    title: yup.string().required("Recipe needs a title"),

    source: yup.string().required("Recipe needs a source"),

    ingredients: yup.string().required("Recipe needs at least one ingredient"),

    instructions: yup.string().required("Recipe needs instructions"),

    category: yup.string().required("Recipe needs a category"),

    img: yup.string().required("Recipe needs an image"),
  });

  // recipeSchema.isValid({
  //   title: "Apples",
  //   source: "Grandma",
  //   ingredients: "4-6 Apples",
  //   instructions:
  //     "Slice apples, removing the core and stem. Serve apples on a plate",
  //   category: "Snack",
  //   img:
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
        title: "",
        source: "",
        ingredients: "",
        instructions: "",
        category: "",
        img: "",
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
    console.log(formState);
    try {
      const isValid = await recipeSchema.isValid(formState);
      if (!isValid) {
        setErrors({ ...errors, message: "Please fill out required fields" });
        return clearErrors();
      }
      const resp = await axiosWithAuth().post(
        "http://localhost:5075/api/recipes",
        formState
      );
      console.log(resp.data);
      push("/recipes");
    } catch (err) {
      console.error({ err });
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
            name="img"
            value={formState.img}
            onChange={changeHandler}
          />
          {errors.img.length > 0 ? <p className="error">{errors.img}</p> : null}
          <br />
        </label>
        <label htmlFor="title">
          title
          <input
            id="title"
            type="text"
            name="title"
            value={formState.title}
            onChange={changeHandler}
          />
          {errors.title.length > 0 ? (
            <p className="error">{errors.title}</p>
          ) : null}
          <br />
        </label>
        <label htmlFor="source">
          source
          <input
            id="source"
            type="text"
            name="source"
            value={formState.source}
            onChange={changeHandler}
          />
          {errors.source.length > 0 ? (
            <p className="error">{errors.source}</p>
          ) : null}
          <br />
        </label>
        <label htmlFor="ingredients">
          ingredients
          <input
            id="ingredients"
            type="text"
            name="ingredients"
            value={formState.ingredients}
            onChange={changeHandler}
          />
          {errors.ingredients.length > 0 ? (
            <p className="error">{errors.ingredients}</p>
          ) : null}
          <br />
        </label>
        <label htmlFor="instructions">
          instructions
          <input
            id="instructions"
            type="text"
            name="instructions"
            value={formState.instructions}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="category">
          category
          <input
            id="category"
            type="text"
            name="category"
            value={formState.category}
            onChange={changeHandler}
          />
          {errors.category.length > 0 ? (
            <p className="error">{errors.category}</p>
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
