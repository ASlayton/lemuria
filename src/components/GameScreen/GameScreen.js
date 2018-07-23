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
        <MyPlayer />
        <Events />
        <StoryLine />
      </div>
    );
  }
};

export default GameScreen;
