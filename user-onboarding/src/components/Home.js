import React from "react";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const { push } = useHistory();
  return (
    <div>
      <h1>Secret Family Recipes!</h1>
      <Link to="/recipes">
        <div className="link">
          <p>Go to your recipes!</p>
        </div>
      </Link>
      <Link to="/new-recipe">
        <div className="link">
          <p>Create a new recipe</p>
        </div>
      </Link>
      <button
        onClick={() => {
          localStorage.clear();
          push("/");
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Home;
