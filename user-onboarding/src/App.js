import React, { useState } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import UpdateRecipe from "./components/UpdateRecipe";
import RecipeList from "./components/RecipeList";
import NewRecipe from "./components/NewRecipe";
import { RecipesContext } from "./contexts/RecipesContext";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import "./App.css";

// const data = [
//   {
//     id: Date.now(),
//     title: "Cheese Pizza",
//     source: "My mom",
//     ingredients: "Cheese, Bread",
//     instructions: "Cook It",
//     category: "Italian",
//     img: "Picture",
//   },
// ];

function App() {
  const [recipeList, setRecipeList] = useState([]);

  const deleteRecipe = (id) => {
    console.log(id);
    axiosWithAuth()
      .delete(`http://localhost:5075/api/recipes/${id}`)
      .then((res) => {
        console.log(res);
        const newList = recipeList.filter((item) => id !== item.id);
        setRecipeList(newList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <RecipesContext.Provider
        value={{ recipeList, setRecipeList, deleteRecipe }}
      >
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/add-recipe" component={NewRecipe} />
        <ProtectedRoute path="/recipes" component={RecipeList} />
        <ProtectedRoute path="/edit-recipe/:id" component={UpdateRecipe} />
      </RecipesContext.Provider>
    </div>
  );
}

export default App;
