import React from 'react';
import './ChosenCharacter.css';
import characterRequests from '../../firebaseRequests/characters';
import auth from '../../firebaseRequests/auth';
import {Link} from 'react-router-dom';

class ChosenCharacter extends React.Component {
  deleteCharacter = () => {
    const firebaseId = auth.getCharacterId();
    characterRequests
      .characterDeleteRequest(firebaseId)
      .then(() => {
        window.parent.location.reload();
      })
      .catch((err) => {
        console.error('error with delete request', err);
      });
  }
  render () {
    const {character} = this.props;
    if (character.nope) {
      return (
        <p>Select a character to play.</p>
      );
    };
    return (
      <div className="character-container">
        <div className="row">
          <button onClick={this.deleteCharacter}><span>&times;</span></button>
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
              <p>FOR: {character.fortitude}</p>
            </div>
          </div>
        </div>
        <Link to="/GameScreen">Start Game</Link>
      </div>
    );
  };
};

export default ChosenCharacter;
