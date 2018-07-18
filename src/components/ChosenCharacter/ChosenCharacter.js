import React from 'react';
// import './ChosenCharacter.css';
// import propTypes from 'prop-types';
import characterOptionalShape from '../../propz/characterProp';
import { isNullOrUndefined } from 'util';

class ChosenCharacter extends React.Component {
  static propTypes = { character: characterOptionalShape };

  render () {
    const {character} = this.props;
    if (character === isNullOrUndefined) {
      return (
        <p>Select a character to play.</p>
      );
    } else {
      return (
        <div className="character-container">
          <div className="row">
            <div className="col-xs-6">
              <img className="profilePic" src={character.profilePic} alt="Chosen Character" />
            </div>
            <div className="col-xs-6">
              <h1>{character.name}</h1>
              <p>{character.currentHealth} / {character.totalHealth}</p>
              <p>{character.currentPsyche} / {character.totalPsyche}</p>
              <div className="row">
                <p>ATK: {character.attackModifier}</p>
                <p>STR: {character.strength}</p>
              </div>
              <div className="row">
                <p>DEF: {character.defense}</p>
                <p>RES: {character.resilience}</p>
              </div>
              <div className="row">
                <p>CON: {character.constitution}</p>
                <p >FOR: {character.fortitude}</p>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }
}

export default ChosenCharacter;
