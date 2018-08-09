import React from 'react';
import './GameScreen.css';
import MyPlayer from '../../components/MyPlayer/MyPlayer';
import Events from '../../components/Events/Events';
import StoryLine from '../../components/StoryLine/StoryLine';
import auth from '../../firebaseRequests/auth';
import {Redirect} from 'react-router-dom';
import characterRequests from '../../firebaseRequests/characters';
class GameScreen extends React.Component {
  state = {
    player: {},
    events: {},
    story: {},
    redirect: false,
  }
  playerHandler = (player) => {
    this.setState({
      player,
    });
  }
  componentDidMount () {
    // FIND PLAYER ID
    const myPlayerId = auth.getCharacterId();
    // GET DATA FOR SPECIFIC CHARACTER
    characterRequests.getSingleCharacterRequest(myPlayerId)
      .then((character) => {
        this.setState({player: character});
      })
      .catch((error) => {
        console.error('Error in getSinglePlayer', error);
      });
  };

  // SET THE STORY STATE ON PARENT CONTAINER
  storyHandler = (story) => {
    this.setState({
      story: {story},
    });
  }

  // CHECK IF THE PLAYER HAS DIED OR GONE MAD
  deathCheck = () => {
    if (this.state.player.currentHealth <= 0 || this.state.player.currentPsyche <= 0) {
      this.setState({redirect: true});
    }
  };

  // SET THE PLAYER LEVEL ON PARENT CONTAINER
  playerLevel = (playerLevel) => {
    this.setState({playerLevel});
  };

  render () {
    if (this.state.redirect) {
      return <Redirect to="/Death" />;
    }
    return (
      <div className="book-shadow">
        <div className='page odd' id='cover'>
          <h1 className="cover-title text-center cover-content">Lemuria</h1>
          <h2 className="text-center cover-content">A Tale</h2>
        </div>
        <div className='page even' id='cover_back'>
          <MyPlayer
            playerHandler={this.playerHandler}
            {...this.state}
          />
        </div>
        <div className='page odd' id='content'>
          <StoryLine
            playerStatus={this.state.player}
          />
        </div>
        <Events
          deathCheck={this.deathCheck}
          player={this.state.player}
          playerHandler={this.playerHandler}
          playerLevel={this.playerLevel}
        />
      </div>
    );
  }
};

export default GameScreen;
