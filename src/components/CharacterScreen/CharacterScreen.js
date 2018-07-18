import React from 'react';
import MyCurrentCharacters from '../myCurrentCharacters/myCurrentCharacters';
import './CharacterScreen.css';
import ChosenCharacter from '../ChosenCharacter/ChosenCharacter';

class CharacterScreen extends React.Component {
  render () {
    return (
      <div className="row">
        <MyCurrentCharacters
          className="col-sm-6"
        />
        <ChosenCharacter
          className="col-sm-6"
        />
      </div>
    );
  }
};

export default CharacterScreen;
