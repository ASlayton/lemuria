import React from 'react';
import MyCurrentCharacters from '../myCurrentCharacters/myCurrentCharacters';
import './CharacterScreen.css';
import ChosenCharacter from '../ChosenCharacter/ChosenCharacter';

class CharacterScreen extends React.Component {
  render () {
    return (
      <div>
        <MyCurrentCharacters />
        <ChosenCharacter />
      </div>
    );
  }
};

export default CharacterScreen;
