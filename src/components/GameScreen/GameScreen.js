import React from 'react';
import './GameScreen.css';
import MyPlayer from '../../components/MyPlayer/MyPlayer';
import Events from '../../components/Events/Events';
import StoryLine from '../../components/StoryLine/StoryLine';
// import StoryLine from '../../components/StoryLine/StoryLine';
import {Redirect} from 'react-router-dom';
import auth from '../../firebaseRequests/auth';
import characterRequests from '../../firebaseRequests/characters';
class GameScreen extends React.Component {
  constructor (props) {
    super(props);
    this.playerHandler = this.playerHandler.bind(this);
    this.storyHandler = this.storyHandler.bind(this);
    this.deathCheck = this.deathCheck.bind(this);
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
    console.error('Player:', player);
  }
  componentDidMount () {
    const myPlayerId = auth.getCharacterId();
    characterRequests.getSingleCharacterRequest(myPlayerId)
      .then((character) => {
        this.props.playerHandler(character);
        this.setState({character: character});
      })
      .catch((error) => {
        console.error('Error in getSinglePlayer', error);
      });
  };
  storyHandler (story) {
    this.setState({
      story: {story},
    });
  }
  deathCheck () {
    if (this.state.player.currentHealth <= 0) {
      return (
        <Redirect to="/Death" />
      );
    };
  }
  render () {
    console.error('My actual player is:', this.state.player.name);
    const playerLvl = this.state.player.level;
    return (
      <div>
        <h1>Main Screen</h1>
        <MyPlayer
          playerHandler={this.playerHandler}
        />
        <Events
          deathCheck={this.deathCheck}
          playerState={this.state.player}
          playerHandler={this.playerHandler}
        />
        <StoryLine level={playerLvl}/>
      </div>
    );
  }
};

export default GameScreen;
