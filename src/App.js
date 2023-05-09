import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import { Container, CssBaseline } from "@mui/material";
import MenuTop from "./components/MenuTop";
import Home from "./components/Home";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuTop />
      <Container maxWidth="xl">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
