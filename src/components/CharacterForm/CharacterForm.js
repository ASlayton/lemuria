import React from 'react';
import PropTypes from 'prop-types';
import dieroll from '../../helpers/dieroll';
import './CharacterForm.css';

const fortitude = dieroll(1,6) + dieroll(1,6) + dieroll(1,6);
const strength = dieroll(1,6) + dieroll(1,6) + dieroll(1,6);
const resilience = dieroll(1,6) + dieroll(1,6) + dieroll(1,6);
const constitution = dieroll(1,6) + dieroll(1,6) + dieroll(1,6);

const defaultCharacter = {
  profilePic: 'https://1.bp.blogspot.com/-UZ7nppqpMxM/WAFaW_1k1fI/AAAAAAAAC-U/LPuHKq3eBycOQLnRawQOlrpc8KERAkyHwCLcB/s320/e3f2f42421a1e56ffc94be0e42ad63b8.jpg',
  name: '',
  totalHealth: 25,
  currentHealth: 25,
  totalPsyche: 25,
  currentPsyche: 25,
  defense: 13,
  attack: 0,
  strength: strength,
  fortitude: fortitude,
  resilience: resilience,
  constitution: constitution,
  exp: 0,
  level: 0,
  lifeSigns: true,
};

class CharacterForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }
  state = {
    newCharacter: defaultCharacter,
    pointsPot: 8,
    conCount: 0,
    fortCount: 0,
    resCount: 0,
    strCount: 0,
    conRolled: false,
    resRolled: false,
    strRolled: false,
    fontRolled: false,
  };

  addConPoint = () => {
    if (this.state.pointsPot > 0 && this.state.conCount < 3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.constitution = (this.state.newCharacter.constitution * 1) + 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) - 1;
      this.setState({pointsPot: tempPointsPot});
      const tempConCount = (this.state.conCount * 1) + 1;
      this.setState({conCount: tempConCount});
    }
  };
  subtractConPoint = () => {
    if (this.state.conCount > -3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.constitution = (this.state.newCharacter.constitution * 1) - 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) + 1;
      this.setState({pointsPot: tempPointsPot});
      const tempConCount = (this.state.conCount * 1) - 1;
      this.setState({conCount: tempConCount});
    }
  };
  evalHealthAmt = () => {
    const conAmt = this.state.newCharacter.constitution;
    const tempEvalCharacter = {...this.state.newCharacter};
    if (conAmt >= 18) {
      tempEvalCharacter.currentHealth = 30;
      tempEvalCharacter.totalHealth = 30;
      this.setState({newCharacter: tempEvalCharacter});
    } else if (conAmt < 18 && conAmt >= 14) {
      tempEvalCharacter.currentHealth = 25;
      tempEvalCharacter.totalHealth = 25;
      this.setState({newCharacter: tempEvalCharacter});
    } else if (conAmt < 14 && conAmt >= 9) {
      tempEvalCharacter.currentHealth = 20;
      tempEvalCharacter.totalHealth = 20;
      this.setState({newCharacter: tempEvalCharacter});
    } else if (conAmt < 9 && conAmt >= 5) {
      tempEvalCharacter.currentHealth = 15;
      tempEvalCharacter.totalHealth = 15;
      this.setState({newCharacter: tempEvalCharacter});
    } else {
      tempEvalCharacter.currentHealth = 10;
      tempEvalCharacter.totalHealth = 10;
      this.setState({newCharacter: tempEvalCharacter});
    };
  };
  addFortPoint = () => {
    if (this.state.pointsPot > 0 && this.state.fortCount < 3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.fortitude = (this.state.newCharacter.fortitude * 1) + 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) - 1;
      this.setState({pointsPot: tempPointsPot});
      const tempFortCount = (this.state.fortCount * 1) + 1;
      this.setState({fortCount: tempFortCount});
    }
  };
  subtractFortPoint = () => {
    if (this.state.fortCount > -3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.fortitude = (this.state.newCharacter.fortitude * 1) - 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) + 1;
      this.setState({pointsPot: tempPointsPot});
      const tempFortCount = (this.state.fortCount * 1) - 1;
      this.setState({fortCount: tempFortCount});
    }
  };
  evalFortAmt = () => {
    const fortAmt = this.state.newCharacter.fortitude;
    const tempCharacter = {...this.state.newCharacter};
    if (fortAmt >= 18) {
      tempCharacter.currentPsyche = 30;
      tempCharacter.totalPsyche = 30;
      this.setState({newCharacter: tempCharacter});
    } else if (fortAmt < 18 && fortAmt >= 14) {
      tempCharacter.currentPsyche = 25;
      tempCharacter.totalPsyche = 25;
      this.setState({newCharacter: tempCharacter});
    } else if (fortAmt < 14 && fortAmt >= 9) {
      tempCharacter.currentPsyche = 20;
      tempCharacter.totalPsyche = 20;
      this.setState({newCharacter: tempCharacter});
    } else if (fortAmt < 9 && fortAmt >= 5) {
      tempCharacter.currentPsyche = 15;
      tempCharacter.totalPsyche = 15;
      this.setState({newCharacter: tempCharacter});
    } else {
      tempCharacter.currentPsyche = 10;
      tempCharacter.totalPsyche = 10;
      this.setState({newCharacter: tempCharacter});
    };
  };
  addStrPoint = () => {
    if (this.state.pointsPot > 0 && this.state.strCount < 3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.strength = (this.state.newCharacter.strength * 1) + 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) - 1;
      this.setState({pointsPot: tempPointsPot});
      const tempStrCount = (this.state.strCount * 1) + 1;
      this.setState({strCount: tempStrCount});
    }
  };
  subtractStrPoint = () => {
    if (this.state.strCount > -3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.strength = (this.state.newCharacter.strength * 1) - 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) + 1;
      this.setState({pointsPot: tempPointsPot});
      const tempStrCount = (this.state.strCount * 1) - 1;
      this.setState({strCount: tempStrCount});
    }
  };
  evalAttackAmt = () => {
    const strAmt = this.state.newCharacter.strength;
    const tempEvalCharacter = {...this.state.newCharacter};
    if (strAmt >= 18) {
      tempEvalCharacter.attack = 2;
      this.setState({newCharacter: tempEvalCharacter});
    } else if (strAmt < 18 && strAmt >= 14) {
      tempEvalCharacter.attack = 1;
      this.setState({newCharacter: tempEvalCharacter});
    } else if (strAmt < 14 && strAmt >= 9) {
      tempEvalCharacter.attack = 0;
      this.setState({newCharacter: tempEvalCharacter});
    } else if (strAmt < 9 && strAmt >= 5) {
      tempEvalCharacter.attack = -1;
      this.setState({newCharacter: tempEvalCharacter});
    } else {
      tempEvalCharacter.attack = -2;
      this.setState({newCharacter: tempEvalCharacter});
    };
  };
  addResPoint = () => {
    if (this.state.pointsPot > 0 && this.state.resCount < 3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.resilience = (this.state.newCharacter.resilience * 1) + 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) - 1;
      this.setState({pointsPot: tempPointsPot});
      const tempResCount = (this.state.resCount * 1) + 1;
      this.setState({resCount: tempResCount});
    };
  };
  subtractResPoint = () => {
    if (this.state.resCount > -3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.resilience = (this.state.newCharacter.resilience * 1) - 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) + 1;
      this.setState({pointsPot: tempPointsPot});
      const tempResCount = (this.state.resCount * 1) - 1;
      this.setState({resCount: tempResCount});
    };
  };
  evalDefenseAmt = () => {
    const resAmt = this.state.newCharacter.resilience;
    const tempCharacter = {...this.state.newCharacter};
    if (resAmt >= 18) {
      tempCharacter.defense = 16;
      this.setState({newCharacter: tempCharacter});
    } else if (resAmt < 18 && resAmt >= 14) {
      tempCharacter.defense = 15;
      this.setState({newCharacter: tempCharacter});
    } else if (resAmt < 14 && resAmt >= 9) {
      tempCharacter.defense = 14;
      this.setState({newCharacter: tempCharacter});
    } else if (resAmt < 9 && resAmt >= 5) {
      tempCharacter.defense = 12;
      this.setState({newCharacter: tempCharacter});
    } else {
      tempCharacter.defense = 10;
      this.setState({newCharacter: tempCharacter});
    };
  };

  formFieldStringState = (name, e) => {
    const tempCharacter = {...this.state.newCharacter};
    tempCharacter[name] = e.target.value;
    this.setState({newCharacter: tempCharacter});
  }

  nameChange = (e) => {
    this.formFieldStringState('name', e);
  };

  imageChange = (e) => {
    this.formFieldStringState('profilePic', e);
  };

  formSubmit = (e) => {
    const {onSubmit} = this.props;
    const {newCharacter} = this.state;
    e.preventDefault();
    if (
      newCharacter.name &&
      newCharacter.profilePic
    ) {
      onSubmit(this.state.newCharacter);
      this.setState({newCharacter: defaultCharacter});
    } else {
      alert('Fill all fields.');
    };
  }

  rollTheDieCon = () => {
    const tempCharacter = {...this.state.newCharacter};
    tempCharacter.constitution = dieroll(5, 20);
    this.setState({newCharacter: tempCharacter});
    this.setState({conRolled: true});
    this.evalHealthAmt();
  };
  rollTheDieFort = () => {
    const tempCharacter = {...this.state.newCharacter};
    tempCharacter.fortitude = dieroll(5, 20);
    this.setState({newCharacter: tempCharacter});
    this.setState({fortRolled: true});
    this.evalFortAmt();
  };
  rollTheDieRes = () => {
    const tempCharacter = {...this.state.newCharacter};
    tempCharacter.resilience = dieroll(5, 20);
    this.setState({newCharacter: tempCharacter});
    this.setState({resRolled: true});
    this.evalDefenseAmt();
  };
  rollTheDieStr = () => {
    const tempCharacter = {...this.state.newCharacter};
    tempCharacter.strength = dieroll(5, 20);
    this.setState({newCharacter: tempCharacter});
    this.setState({strRolled: true});
    this.evalAttackAmt();
  };

  conButtons = () => {
    if (this.state.conRolled) {
      return (
        <div>
          <div className="col-sm-6">
            <h3>Health: {this.state.newCharacter.totalHealth}</h3>
          </div>
          <div className="col-sm-6">
            <h3>Constitution: {this.state.newCharacter.constitution}</h3>
            <button type="button" onClick={this.subtractConPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
            <button type="button" onClick={this.addConPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Roll Constitution:</h3>
          <button onClick={this.rollTheDieCon.bind()} className="diceBtn"><span><img src="https://www.spreadshirt.ca/image-server/v1/mp/designs/1005275915,width=178,height=178/d20.png" alt="die"/></span></button>
        </div>
      );
    }
  };

  fortButtons = () => {
    if (this.state.fortRolled) {
      return (
        <div>
          <div className="col-sm-6">
            <h3>Psyche: {this.state.newCharacter.totalPsyche}</h3>
          </div>
          <div className="col-sm-6">
            <h3>Fortitude: {this.state.newCharacter.fortitude}</h3>
            <button type="button" onClick={this.subtractFortPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
            <button type="button" onClick={this.addFortPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Roll Fortitude:</h3>
          <button onClick={this.rollTheDieFort.bind()} className="diceBtn"><span><img src="https://www.spreadshirt.ca/image-server/v1/mp/designs/1005275915,width=178,height=178/d20.png" alt="die"/></span></button>
        </div>
      );
    }
  };
  resButtons = () => {
    if (this.state.resRolled) {
      return (
        <div>
          <div className="col-sm-6">
            <h3>Defense: {this.state.newCharacter.defense}</h3>
          </div>
          <div className="col-sm-6">
            <h3>Resilience: {this.state.newCharacter.resilience}</h3>
            <button type="button" onClick={this.subtractResPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
            <button type="button" onClick={this.addResPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Roll Resilience:</h3>
          <button onClick={this.rollTheDieRes.bind()} className="diceBtn"><span><img src="https://www.spreadshirt.ca/image-server/v1/mp/designs/1005275915,width=178,height=178/d20.png" alt="die"/></span></button>
        </div>
      );
    }
  };
  strButtons = () => {
    if (this.state.strRolled) {
      return (
        <div>
          <div className="col-sm-6">
            <h3>Attack Modifier: {this.state.newCharacter.attack}</h3>
          </div>
          <div className="col-sm-6">
            <h3>Strength: {this.state.newCharacter.strength}</h3>
            <button type="button" onClick={this.subtractStrPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
            <button type="button" onClick={this.addStrPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Roll Strength:</h3>
          <button onClick={this.rollTheDieStr.bind()} className="diceBtn"><span><img src="https://www.spreadshirt.ca/image-server/v1/mp/designs/1005275915,width=178,height=178/d20.png" alt="die"/></span></button>
        </div>
      );
    }
  };

  submitBtn = () => {
    if (this.state.resRolled && this.state.conRolled && this.state.fortRolled && this.state.strRolled) {
      return (
        <button type="submit" className="btn btn-info col-sm-4 col-sm-offset-4">Save Character</button>
      );
    };
  }

  render () {
    const {newCharacter} = this.state;
    return (
      <div className="form-container col-sm-10 col-sm-offset-1">
        <form onSubmit={this.formSubmit}>
          <fieldset className="text-center">
            <label htmlFor="name">Name:</label>
            <br/>
            <input
              type="text"
              id="name"
              placeholder="UserName"
              value={newCharacter.name}
              onChange={this.nameChange}
            />
          </fieldset>
          <fieldset className="text-center">
            <label htmlFor="profilePic">Avatar:</label>
            <br/>
            <input
              type="text"
              id="profilePic"
              placeholder="Avatar URL"
              value={newCharacter.profilePic}
              onChange={this.imageChange}
            />
          </fieldset>
          <br/>
          {this.submitBtn()}
        </form>

        <div className="row">
          <h3 className="text-center">Points Pot: {this.state.pointsPot}</h3>
        </div>
        <div>
          <div className="row">
            <div className="col-sm-6">
              {this.conButtons()}
            </div>
            <div className="col-sm-6">
              {this.fortButtons()}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              {this.strButtons()}
            </div>
            <div className="col-sm-6">
              {this.resButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default CharacterForm;
