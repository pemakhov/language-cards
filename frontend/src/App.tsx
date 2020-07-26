import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/auth/Login";
import { Add } from "./pages/add/Add";
import { Study } from "./pages/study/Study";
import { NotFound } from "./pages/not-found/NotFound";
import { AuthProvider } from "./context/AuthContext";

interface IAppProps {}

interface IAppState {
  loggedIn: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  logIn(): void {
    this.setState({ loggedIn: true });
  }

  logOut(): void {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" exact component={Add} />
            <Route path="/study" exact component={Study} />
            <Route path="/login" exact component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
