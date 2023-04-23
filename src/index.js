import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);

reportWebVitals();
