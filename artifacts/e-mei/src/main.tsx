import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "wouter";
import App from "./App";
import LoginPage from "./LoginPage";
import OnboardingPage from "./OnboardingPage";
import AppLayout from "./app/AppLayout";
import BlogPage from "./BlogPage";
import TermosPage from "./TermosPage";
import PrivacidadePage from "./PrivacidadePage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/app" component={AppLayout} />
      <Route path="/artigos" component={BlogPage} />
      <Route path="/termos" component={TermosPage} />
      <Route path="/privacidade" component={PrivacidadePage} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);
