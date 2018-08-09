import './LandingPage.css';
import React from 'react';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class LandingPage extends React.Component {
  render () {
    return (
      <div>
        <div className="logo-container">
        </div>
        <div>
          <h3>Login to Play</h3>
        </div>
      </div>
    );
  }
};

export default LandingPage;
