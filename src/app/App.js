import React, { Component } from 'react';
import firebase from 'firebase';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import GameScreen from '../components/GameScreen/GameScreen';
import './App.css';

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/Login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/Home', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  wentAway = () => {
    this.setState({authed: false});
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.wentAway}
            />
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute
                  path="/register"
                  authed={this.state.authed}
                  component={Register}
                />
                <PublicRoute
                  path="/login"
                  authed={this.state.authed}
                  component={Login}
                />
                <PrivateRoute
                  path="/GameScreen"
                  authed={this.state.authed}
                  component={GameScreen}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
