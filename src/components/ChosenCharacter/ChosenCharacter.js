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
          <button className="btn btn-danger text-center" onClick={this.deleteCharacter}><span>Delete Character</span></button>
          <div className="col-sm-6">
            <img className="profilePic" src={character.profilePic} alt="Chosen Character" />
          </div>
          <div className="col-sm-6">
            <h1>{character.name}</h1>
            <h3>Health:</h3>
            <p>{character.currentHealth} / {character.totalHealth}</p>
            <h3>Psyche:</h3>
            <p>{character.currentPsyche} / {character.totalPsyche}</p>
            <h3>Attributes:</h3>
            <div className="row">
              <p className="col-sm-6">ATK: {character.attackModifier}</p>
              <p className="col-sm-6">STR: {character.strength}</p>
            </div>
            <div className="row">
              <p className="col-sm-6">DEF: {character.defense}</p>
              <p className="col-sm-6">RES: {character.resilience}</p>
            </div>
            <div className="row">
              <p className="col-sm-6">CON: {character.constitution}</p>
              <p className="col-sm-6">FOR: {character.fortitude}</p>
            </div>
          </div>

        </div>
        <Link className="link-style" to="/GameScreen">Start Game</Link>
      </div>
    );
  };
};

export default ChosenCharacter;
