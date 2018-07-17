import './CharacterScreen.css';
import React from 'react';
import PropTypes from 'prop-types';
import dieroll from '../../helpers/dieroll';

const defaultChar = {
  'uid': '',
  'profilePic': '',
  'name': '',
  'health': 0,
  'constitution': 0,
  'psyche': 0,
  'fortitude': 0,
  'attack': 0,
  'strength': 0,
  'defense': 0,
  'resilience': 0,
};

class CharacterScreen extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    newChar: defaultChar,
  };

  formFieldStringState = (name, e) => {
    const tempChar = {...this.state.newChar};
    tempChar[name] = e.target.value;
    this.setState({newChar: tempChar});
  }

  profilePicChange = (e) => {
    this.formFieldStringState('profilePic', e);
  };

  nameChange = (e) => {
    this.formFieldStringState('name', e);
  };

  formSubmit = (e) => {
    const {onSubmit} = this.props;
    const {newChar} = this.state;
    e.preventDefault();
    if (
      newChar.name && newChar.profilePic
    ) {
      onSubmit(this.state.newChar);
      this.setState({newChar: defaultChar});
    } else {
      alert('We have a problem');
    };
  };

  render () {
    const { newChar } = this.state;
    return (
      <div>
        <h1>Create New Character</h1>
        <form onSubmit={this.formSubmit}>
          <div className="row">
            <fieldset className="col-xs-3">
              <img src={newChar.profilePic} alt="Profile"/>
              <label htmlFor="profilePic">Profile Image:</label>
              <br />
              <input
                className="col-xs-12"
                type="text"
                id="profilePic"
                placeholder="Enter Profile Image URL"
                value={newChar.profilePic}
                onChange={this.profilePicChange}
              />
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="name">Name:</label>
              <br />
              <input
                className="col-xs-12"
                type="text"
                id="name"
                placeholder="Tell us your Username..."
                value={newChar.name}
                onChange={this.nameChange}
              />
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="col-xs-3">
              <label htmlFor="health">Health:</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="health"
                value={newChar.health}
                disabled
              />
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="psyche">Psyche:</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="psyche"
                value={newChar.psyche}
                disabled
              />
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="attack">Attack Modifier:</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="attack"
                value={newChar.attack}
                disabled
              />
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="defense">Defense:</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="defense"
                value={newChar.defense}
                disabled
              />
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="col-xs-3">
              <label htmlFor="constitution">Constitution:</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="constitution"
                value={newChar.constitution}
                disabled
              />
              <button
                onClick={dieroll(1, 20)}
              >ROLL</button>
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="fortitude">Fortitude:</label>
              <br />
              <input
                className="col-xs-12"
                type="text"
                id="fortitude"
                value={newChar.fortitude}
                disabled
              />
              <button>ROLL</button>
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="strength">Strength</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="strength"
                value={newChar.strength}
                disabled
              />
              <button>ROLL</button>
            </fieldset>
            <fieldset className="col-xs-3">
              <label htmlFor="resilience">Resilience</label>
              <br />
              <input
                className="col-xs-12"
                type="number"
                id="resilience"
                value={newChar.resilience}
                disabled
              />
              <button>ROLL</button>
            </fieldset>
          </div>
          <button>Save Character</button>
        </form>
      </div>
    );
  }
};

export default CharacterScreen;
