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
  // constructor (props) {
  //   super(props);
  //   // this.playerHandler = this.playerHandler.bind(this);
  //   // this.storyHandler = this.storyHandler.bind(this);
  //   // this.deathCheck = this.deathCheck.bind(this);

  //   };
  // };
  state = {
    player: {},
    events: {},
    story: {},
  }
  playerHandler = (player) => {
    this.setState({
      player,
    });
  }
  componentDidMount () {
    const myPlayerId = auth.getCharacterId();
    characterRequests.getSingleCharacterRequest(myPlayerId)
      .then((character) => {
        this.setState({player: character});
      })
      .catch((error) => {
        console.error('Error in getSinglePlayer', error);
      });
  };

  storyHandler = (story) => {
    this.setState({
      story: {story},
    });
  }
  deathCheck = () => {
    if (this.state.player.currentHealth <= 0) {
      return (
        <Redirect to="/Death" />
      );
    };
  };

  playerLevel = (playerLevel) => {
    this.setState({playerLevel});
  };

  render () {
    return (
      <div>
        <h1>Main Screen</h1>
        <MyPlayer
          playerHandler={this.playerHandler}
          {...this.state}
        />
        <Events
          deathCheck={this.deathCheck}
          player={this.state.player}
          playerHandler={this.playerHandler}
          playerLevel={this.playerLevel}
        />
        <StoryLine
          playerStatus={this.state.player}
        />
      </div>
    );
  }
};

export default GameScreen;
