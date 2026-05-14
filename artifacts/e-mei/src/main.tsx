import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "wouter";
import App from "./App";
import LoginPage from "./LoginPage";
import OnboardingPage from "./OnboardingPage";
import AppLayout from "./app/AppLayout";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/app" component={AppLayout} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);
