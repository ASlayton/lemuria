// SCREEN SHOWN WHEN PLAYER DIES OR GOES MAD

import React from 'react';
import {Link} from 'react-router-dom';
import './Death.css';

class Death extends React.Component {
  render () {
    return (
      <div className="death-container">
        <h1 className="gameOver text-center">GAME OVER</h1>
        <Link className="link-style text-center" to="/Home">Return Home</Link>
      </div>
    );
  }
};

export default Death;
