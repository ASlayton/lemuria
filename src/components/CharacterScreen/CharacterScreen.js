import React from 'react';
import ChosenCharacter from '../../components/ChosenCharacter/ChosenCharacter';
import MyCurrentCharacters from '../../components/myCurrentCharacters/myCurrentCharacters';
import CharacterForm from '../../components/CharacterForm/CharacterForm';
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
  }

  componentDidMount () {
    const uid = auth.getUid();
    characterRequest.characterGetRequest(uid)
      .then((characters) => {
        this.setState({characters});
      })
      .catch((err) => {
        console.error('error within Character GET', err);
      });
  }

  formSubmitEvent = (newCharacter) => {
    newCharacter.uid = auth.getUid();
    characterRequest.characterPostRequest(newCharacter)
      .then((characters) => {
        this.setState({characters});
      })
      .catch((err) => {
        console.error('error with Character POST', err);
      });
  };

  render () {
    const {selectedCharacterId, characters} = this.state;
    const selectedCharacter = characters.find(character => character.id === selectedCharacterId) || {nope: 'nope'};
    if (characters.length === 0) {
      return (
        <div>
          <CharacterForm
            onSubmit={this.formSubmitEvent}
          />
        </div>
      );
    };
    return (
      <div>
        <MyCurrentCharacters
          characters={this.state.characters}
          onCharacterSelection = {this.characterSelectEvent}
        />
        <ChosenCharacter
          character={selectedCharacter}
        />
      </div>
    );
  };
};

export default CharacterScreen;
