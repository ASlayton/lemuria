import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from  '../../firebaseRequests/auth';
import './Navbar.css';

class Navbar extends React.Component {
  render () {
    const {authed, wentAway} = this.props;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      wentAway();
    };

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="test-icon"></span>
            </button>
            <h1>Lemuria</h1>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            {
              authed ? (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <button
                      onClick={logoutClickEvent}
                      className="btn btn-default"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/login">Login!</Link>
                  </li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
