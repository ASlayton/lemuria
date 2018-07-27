import React from 'react';
import './GameScreen.css';
import MyPlayer from '../../components/MyPlayer/MyPlayer';
import Events from '../../components/Events/Events';
import StoryLine from '../../components/StoryLine/StoryLine';
// import StoryLine from '../../components/StoryLine/StoryLine';
import {Redirect} from 'react-router-dom';
class GameScreen extends React.Component {
  constructor (props) {
    super(props);
    this.playerHandler = this.playerHandler.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.storyHandler = this.storyHandler.bind(this);
    this.state = {
      player: {},
      events: {},
      story: {},
    };
  };
  playerHandler (player) {
    this.setState({
      player: {player},
    });
  }

  storyHandler (story) {
    this.setState({
      story: {story},
    });
  }
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
        <MyPlayer playerHandler={this.props.playerHandler}/>
        <Events
          deathCheck={this.deathCheck()}
          playerState={this.state.player}
        />
        <StoryLine playerState={this.state.player}/>
      </div>
    );
  }
};

export default GameScreen;
