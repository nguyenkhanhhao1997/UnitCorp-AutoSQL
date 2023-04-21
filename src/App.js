import "./App.css";
import React from "react";
import { Route } from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuTop from "./components/MenuTop";
import Home from "./components/Home";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuTop />
      <Container maxWidth="md">
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
      </Container>
    </React.Fragment>
  );
};

export default App;
