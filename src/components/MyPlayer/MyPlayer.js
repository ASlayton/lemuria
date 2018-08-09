import React from 'react';
import './MyPlayer';
import {ProgressBar} from 'react-bootstrap';
import percentageBar from '../../helpers/percentageBar';

class MyPlayer extends React.Component {
  state = {
    player: {},
  }
  render () {
    return (
      <div className="myPlayer-container text-center">
        <div className="picture-container">
          <img src={this.props.player.profilePic} alt="Profile" className="player-profile-pic" />
        </div>
        <div className="profile-info">
          <div className="col-sm-12">
            <h3 className="col-sm-6">{this.props.player.name}</h3>
            <h4 className="col-sm-6">LVL {this.props.player.level}</h4>
            <h4>EXP {this.props.player.exp}</h4>
          </div>
          <div className="col-sm-12">
            <h4>Health</h4>
            <h5>{this.props.player.currentHealth} / {this.props.player.totalHealth}</h5>
            <ProgressBar  bsStyle="warning" now={percentageBar(this.props.player.currentHealth, this.props.player.totalHealth)} />
            <h4>Psyche</h4>
            <h5>{this.props.player.currentPsyche} / {this.props.player.totalPsyche}</h5>
            <ProgressBar  bsStyle="warning" now={percentageBar(this.props.player.currentPsyche, this.props.player.totalPsyche)} />
          </div>
        </div>
      </div>
    );
  };
};

export default MyPlayer;
