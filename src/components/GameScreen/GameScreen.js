import React from 'react';
import './GameScreen.css';
import MyPlayer from '../../components/MyPlayer/MyPlayer';
import Events from '../../components/Events/Events';
import StoryLine from '../../components/StoryLine/StoryLine';
import auth from '../../firebaseRequests/auth';
import characterRequest from '../../firebaseRequests/characters';
class GameScreen extends React.Component {

  componentDidMount () {
    const characterId = auth.getCharacterId();
    characterRequest.getSingleCharacterRequest(characterId)
      .then((characters) => {
        this.setState({characters});
      })
      .catch((err) => {
        console.error('error within Single Character GET', err);
      });
  }

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
