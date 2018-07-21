import React from 'react';
import './GameScreen.css';
import MyPlayer from '../../components/MyPlayer/MyPlayer';
import Events from '../../components/Events/Events';
import StoryLine from '../../components/StoryLine/StoryLine';
class GameScreen extends React.Component {
  state={};

  render () {
    return (
      <div>
        <h1>Main Screen</h1>
        <MyPlayer
          className="col-sm-6"
        />
        <Events
          className="col-sm-6"
        />
        <StoryLine
          className="col-sm-6"
        />
      </div>
    );
  }
};

export default GameScreen;
