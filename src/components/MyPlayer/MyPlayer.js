import React from 'react';
import './MyPlayer';
import auth from '../../firebaseRequests/auth';
import characterRequests from '../../firebaseRequests/characters';
import {ProgressBar} from 'react-bootstrap';
import percentageBar from '../../helpers/percentageBar';

class MyPlayer extends React.Component {
  state = {
    character: {},
  }

  componentDidMount () {
    const myPlayerId = auth.getCharacterId();
    characterRequests.getSingleCharacterRequest(myPlayerId)
      .then((character) => {

        this.setState({character: character});
      })
      .catch((error) => {
        console.error('Error in getSinglePlayer', error);
      });
  };

  render () {
    const character = this.state;

    return (
      <div className="myCharacter-container col-sm-6">
        <div className="profile-image col-sm-6">
          <img src={this.state.character.profilePic} alt="Profile" />
        </div>
        <div className="profile-info col-sm-6">
          <div>
            <h3 className="col=sm-6">{this.state.character.name}</h3>
            <h4 className="col-sm-6">LVL {this.state.character.level}</h4>
          </div>
          <ProgressBar now={percentageBar(character.currentHealth, character.totalHealth)} />
          <ProgressBar now={percentageBar(character.currentPsyche, character.totalPsyche)} />
        </div>
      </div>
    );
  }
};

export default MyPlayer;
