// IMPORT NECCESSARY FILES
import React from 'react';
import firebase from 'firebase';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import CharacterScreen from '../components/CharacterScreen/CharacterScreen';
import GameScreen from '../components/GameScreen/GameScreen';
import fbConnection from '../firebaseRequests/connection';
import './App.css';
import CreateCharacter from '../components/CreateCharacter/CreateCharacter';

// START FIREBASE CONNECTION
fbConnection();

// DEFINE PRIVATE ROUTE
const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/CharacterScreen'}}
          />
        )
      }
    />
  );
};

// DEFINE PUBLIC ROUTE
const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/Home'}}
          />
        )
      }
    />
  );
};

class App extends React.Component {
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
              wentAway={this.wentAway}
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
                  path="/Home"
                  authed={this.state.authed}
                  component={Home}
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
                <PrivateRoute
                  path="/CreateCharacter"
                  authed={this.state.authed}
                  component={CreateCharacter}
                />
                <PrivateRoute
                  path="/CharacterScreen"
                  authed={this.state.authed}
                  component={CharacterScreen}
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
