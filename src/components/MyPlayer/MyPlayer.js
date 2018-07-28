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
      <div className="myPlayer-container col-sm-6">
        <div className="profile-image col-sm-6">
          <img src={this.props.player.profilePic} alt="Profile" className="Player-profile-pic"/>
        </div>
        <div className="profile-info col-sm-6">
          <div className="col-sm-12">
            <h3 className="col-sm-6">{this.props.player.name}</h3>
            <h4 className="col-sm-6">LVL {this.props.player.level}</h4>
          </div>
          <div className="col-sm-12">
            <ProgressBar now={percentageBar(this.props.player.currentHealth, this.props.player.totalHealth)} />
            <ProgressBar now={percentageBar(this.props.player.currentPsyche, this.props.player.totalPsyche)} />
          </div>
        </div>
      </div>
    );
  };
};

export default MyPlayer;
