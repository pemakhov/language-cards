import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import 'aos/dist/aos.css';
import { Home } from "./pages/home/Home";
import { SignupLogic } from "./pages/auth/SignupLogic";
import { LoginLogic } from "./pages/auth/LoginLogic";
import { Add } from "./pages/add/Add";
import { Study } from "./pages/study/Study";
import { NotFound } from "./pages/not-found/NotFound";
import { AuthProvider } from "./context/AuthContext";

interface IAppProps {}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" exact component={Add} />
            <Route path="/study" exact component={Study} />
            <Route path="/signup" exact component={SignupLogic} />
            <Route path="/login" exact component={LoginLogic} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
