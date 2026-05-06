import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "wouter";
import App from "./App";
import LoginPage from "./LoginPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);
