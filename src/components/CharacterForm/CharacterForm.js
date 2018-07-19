import React from 'react';
import PropTypes from 'prop-types';
import './CharacterForm.css';

const defaultCharacter = {
  profilePic: '',
  name: '',
  currentHealth: 0,
  totalHealth: 0,
  currentPsyche: 0,
  totalPsyche: 0,
  attackModifier: 0,
  defense: 0,
  strength: 0,
  fortitude: 0,
  resilience: 0,
  constitution: 0,
  exp: 0,
  level: 0,
};

class CharacterForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }
  state = {
    newCharacter: defaultCharacter,
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
      newCharacter.profilePic &&
      newCharacter.currentHealth &&
      newCharacter.totalHealth &&
      newCharacter.currentPsyche &&
      newCharacter.totalPsyche &&
      newCharacter.attackModifier &&
      newCharacter.defense &&
      newCharacter.strength &&
      newCharacter.fortitude &&
      newCharacter.resilience &&
      newCharacter.constitution &&
      newCharacter.exp &&
      newCharacter.level
    ) {
      onSubmit(this.state.newCharacter);
      this.setState({newCharacter: defaultCharacter});
    } else {
      alert ('Cannot submit this information');
    };
  }

  render () {
    const {newCharacter} = this.state;
    return (
      <div>
        <h1>Create Character</h1>
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
          <button>Save Character Information</button>
        </form>
      </div>
    );
  };
};

export default CharacterForm;
