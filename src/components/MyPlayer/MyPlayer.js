import React from 'react';
import './MyPlayer';
import characterRequests from '../../firebaseRequests/characters';
import auth from '../../firebaseRequests/auth';

class MyPlayer extends React.Component {
  state = {
    character: '',
  }
  percentageBar = (current, total) => {
    const currentPercent = (current * 1 / total * 1);
    return currentPercent;
  };

  componentDidMount () {
    const myPlayerId = auth.getCharacterId();
    characterRequests.getSingleCharacterRequest(myPlayerId)
      .then((character) => {
        this.setState(character);
      })
      .catch((error) => {
        console.error('Error in getSinglePlayer', error);
      });
  };

  render () {
    return (
      <div>
        <div className="profile-image col-sm-6">
          <img src={this.state.character.profilePic} alt="Profile" />
        </div>
        <div className="profile-info col-sm-6">
          <div>
            <h3 className="col=sm-6">{this.state.character.name}</h3>
            <h4 className="col-sm-6">LVL {this.state.character.level}</h4>
          </div>
          <div className="progress col-sm-12">
            <div className="progress-bar" role="progressbar" aria-valuenow={this.state.character.currentHealth} aria-valuemin="0" aria-valuemax={this.state.character.totalHealth}>
              {this.percentageBar(this.state.character.currentHealth, this.state.character.totalHealth)}%
            </div>
          </div>
          <div className="progress col-sm-12">
            <div className="progress-bar" role="progressbar" aria-valuenow={this.state.character.currentPsyche} aria-valuemin="0" aria-valuemax={this.state.character.totalPsyche}>
              {this.percentageBar(this.state.character.currentPsyche, this.state.character.totalPsyche)}%
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyPlayer;
