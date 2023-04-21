import "./App.css";
import React from "react";
import { Route } from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuTop from "./components/MenuTop";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuTop />
      <Container maxWidth="md">
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Container>
    </React.Fragment>
  );
};

export default App;
