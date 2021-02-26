import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
