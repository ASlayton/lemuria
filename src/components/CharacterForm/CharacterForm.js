import React from 'react';
import PropTypes from 'prop-types';
import dieroll from '../../helpers/dieroll';
import './CharacterForm.css';

const rollHealth = dieroll(10, 25);
const rollPsyche = dieroll(10, 25);

const defaultCharacter = {
  profilePic: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg',
  name: '',
  totalHealth: rollHealth,
  currentHealth: rollHealth,
  totalPsyche: rollPsyche,
  currentPsyche: rollPsyche,
  defense: dieroll(1, 20),
  strength: dieroll(1, 20),
  fortitude: dieroll(1, 20),
  resilience: dieroll(1, 20),
  constitution: dieroll(1, 20),
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
    pointsPot: 12,
    conCount: 0,
    fortCount: 0,
    resCount: 0,
    strCount: 0,
  };

  evalStats = (val) => {
    if (val < 4) {
      return (-2);
    } else if (val >= 4 && val < 10) {
      return (-1);
    } else if (val >= 10 && val < 13) {
      return (0);
    } else if (val >= 13 && val < 18) {
      return (1);
    } else {
      return (2);
    }
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
    const modifier = this.evalStats(this.state.newCharacter.constitution);
    const modCharacter = {...this.state.newCharacter};
    modCharacter.totalHeath = (this.state.newCharacter.totalHealth * 1) + modifier;
    this.setState({newCharacter: modCharacter});
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

  addFortPoint = () => {
    console.log(this.state.fortCount);
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
    if (this.state.conCount > -3) {
      const tempCharacter = {...this.state.newCharacter};
      tempCharacter.strength = (this.state.newCharacter.strength * 1) - 1;
      this.setState({newCharacter: tempCharacter});
      const tempPointsPot = (this.state.pointsPot * 1) + 1;
      this.setState({pointsPot: tempPointsPot});
      const tempStrCount = (this.state.strCount * 1) - 1;
      this.setState({strCount: tempStrCount});
    }
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
    }
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
    }
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

  render () {
    const {newCharacter} = this.state;
    return (
      <div className="form-container col-sm-10 col-sm-offset-1">
        <form onSubmit={this.formSubmit}>
          <fieldset>
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
          <fieldset>
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
          <button type="submit">Save Character</button>
        </form>
        <div className="row">
          <h3>Points Pot: {this.state.pointsPot}</h3>
        </div>
        <div>
          <div className="row">
            <fieldset className="col-sm-6">
              <h3>Health:</h3>
              <h3>
                {this.state.newCharacter.totalHealth}
              </h3>
            </fieldset>
            <fieldset className="col-sm-6">
              <h3>Constitution:</h3>
              <h3>
                {this.state.newCharacter.constitution}
              </h3>
              <button type="button" onClick={this.subtractConPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
              <button type="button" onClick={this.addConPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="col-sm-6">
              <h3>Psyche:</h3>
              <h3>
                {this.state.newCharacter.totalPsyche}
              </h3>
            </fieldset>
            <fieldset className="col-sm-6">
              <h3>Fortitude:</h3>
              <h3>
                {this.state.newCharacter.fortitude}
              </h3>
              <button type="button" onClick={this.subtractFortPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
              <button type="button" onClick={this.addFortPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="col-sm-6">
              <h3>Attack Modifier:</h3>
              <h3>
                {this.state.newCharacter.attackModifier}
              </h3>
            </fieldset>
            <fieldset className="col-sm-6">
              <h3>Strength:</h3>
              <h3>
                {this.state.newCharacter.strength}
              </h3>
              <button type="button" onClick={this.subtractStrPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
              <button type="button" onClick={this.addStrPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="col-sm-6">
              <h3>Defense:</h3>
              <h3>
                {this.state.newCharacter.defense}
              </h3>
            </fieldset>
            <fieldset className="col-sm-6">
              <h3>Resilience:</h3>
              <h3>
                {this.state.newCharacter.resilience}
              </h3>
              <button type="button" onClick={this.subtractResPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span></button>
              <button type="button" onClick={this.addResPoint.bind()} className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
            </fieldset>
          </div>
        </div>
      </div>
    );
  };
};

export default CharacterForm;
