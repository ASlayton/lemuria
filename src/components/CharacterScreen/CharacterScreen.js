import React from 'react';
import ChosenCharacter from '../../components/ChosenCharacter/ChosenCharacter';
import MyCurrentCharacters from '../../components/myCurrentCharacters/myCurrentCharacters';
import {Redirect} from 'react-router-dom';
import characterRequest from '../../firebaseRequests/characters';
import auth from '../../firebaseRequests/auth';
import './CharacterScreen.css';

class CharacterScreen extends React.Component {
  state = {
    characters: [],
    selectedCharacterId: -1,
  }

  characterSelectEvent = (id) => {
    this.setState({
      selectedCharacterId: id,
    });
    auth.setCharacterId(id);
  }

  componentDidMount () {
    const uid = auth.getUid();
    characterRequest.characterGetRequest(uid)
      .then((characters) => {
        this.setState({characters});
        if (characters.length === 0) {
          return (
            <Redirect to='/CreateCharacter' />
          );
        };
      })
      .catch((err) => {
        console.error('error within Character GET', err);
      });
  }

  removeFromCharacters = (key) => {
    const newList = {...this.state.characters};
    delete newList[key];
    this.setState({characters: newList});
  };

  render () {

    const {selectedCharacterId, characters} = this.state;
    const selectedCharacter = characters.find(character => character.id === selectedCharacterId) || {nope: 'nope'};

    return (
      <div>
        <MyCurrentCharacters
          characters={this.state.characters}
          onCharacterSelection = {this.characterSelectEvent}
        />
        <ChosenCharacter
          character={selectedCharacter}
          removeFromCharacters = {this.removeFromCharacters}
        />
      </div>
    );
  };
};

export default CharacterScreen;
