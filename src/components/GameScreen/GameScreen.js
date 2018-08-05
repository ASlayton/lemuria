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
      this.setState({redirect: true});
    }
  };

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
