import React from 'react';
import './MyPlayer';
import auth from '../../firebaseRequests/auth';
import characterRequests from '../../firebaseRequests/characters';

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

  percentageBar = (current, total) => {
    const currentPercent = (current * 1 / total * 1) * 100;
    return currentPercent;
  };
  render () {
    const character = this.state;
    const healthStyle = {
      'width': `${this.percentageBar(character.currentHealth, character.totalHealth)}%`,
      'minWidth': '2em',
    };
    const psycheStyle = {
      'width': `${this.percentageBar(character.currentPsyche, character.totalPsyche)}%`,
      'minWidth': '2em',
    };
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
          <div className="progress col-sm-12">
            <div className="progress-bar" role="progressbar" aria-valuenow={this.state.character.currentHealth} aria-valuemin="0" aria-valuemax={this.state.character.totalHealth} style={healthStyle}>
              {this.percentageBar(this.state.character.currentHealth, this.state.character.totalHealth)}%
            </div>
          </div>
          <div className="progress col-sm-12">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={this.state.character.currentPsyche} aria-valuemin="0"
              aria-valuemax={this.state.character.totalPsyche}
              style={psycheStyle}
            >
              {this.percentageBar(this.state.character.currentPsyche, this.state.character.totalPsyche)}%
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyPlayer;
