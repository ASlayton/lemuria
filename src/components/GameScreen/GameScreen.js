import React from 'react';
import './GameScreen.css';
import MyPlayer from '../../components/MyPlayer/MyPlayer';
import Events from '../../components/Events/Events';
// import StoryLine from '../../components/StoryLine/StoryLine';
import {Redirect} from 'react-router-dom';
class GameScreen extends React.Component {
  state={
    player: {},
    event: {},
    story: {},
  };
  deathCheck (healthCheck) {
    if (healthCheck <= 0) {
      return (
        <Redirect to="/Death" />
      );
    };
  }
  render () {
    return (
      <div>
        <h1>Main Screen</h1>
        <MyPlayer />
        <Events/>
        {/* <StoryLine /> */}
      </div>
    );
  }
};

export default GameScreen;
