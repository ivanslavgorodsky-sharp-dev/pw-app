import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Component } from "react";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/home";
import Registration from "./components/register";
import withStorage from "./components/withLocalStorage";
import AppProps from './components/types';

class App extends Component<AppProps> {
  updateUser() {
    if (this.props.token) {
      this.props.userInfo (this.props.token)
        .then( user => {
          if (user)
            this.props.save ("user", JSON.stringify (user));
        });
      this.props.getTransactions (this.props.token)
        .then( transactions => {
          if (transactions)
            this.props.save ("transactions", JSON.stringify (transactions));
        });
    }
  }

  componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate() {
    if (!this.props.user.name && !this.props.isLoading) {
      this.updateUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="content">
          <Switch>
            <Route exact path="/login" render={ () => <Login {...this.props} />} />
            <Route exact path="/register" render={ () => <Registration {...this.props} />} />
            <Route path="/" render={ () => {
              return this.props.token ? <Main {...this.props} /> : <Redirect to="/login" /> }
            } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const WrappedComponent = withStorage(App);
export default WrappedComponent;
