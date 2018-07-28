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
          <fieldset>
            <label htmlFor="currentHealth">Health:</label>
            <br/>
            <h3
              type="text"
              id="totalHealth"
              placeholder="Health"
            >
              {defaultCharacter.totalHealth}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="totalPsyche">Psyche:</label>
            <br/>
            <h3
              type="text"
              id="totalPsyche"
              placeholder="Psyche"
            >
              {defaultCharacter.totalPsyche}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="attackModifier">Attack Modifier:</label>
            <br/>
            <h3
              type="text"
              id="attackModifier"
              placeholder="Modifier"
            >
              {defaultCharacter.attackModifier}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="defense">Defense:</label>
            <br/>
            <h3
              type="text"
              id="defense"
              placeholder=" URL"
            >
              {defaultCharacter.defense}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="strength">Strength:</label>
            <br/>
            <h3
              type="text"
              id="strength"
              placeholder="Strength"
            >
              {defaultCharacter.strength}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="fortitude">Fortitude:</label>
            <br/>
            <h3
              type="text"
              id="fortitude"
              placeholder="Fortitude"
            >
              {defaultCharacter.fortitude}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="resilience">Resilience:</label>
            <br/>
            <h3
              type="text"
              id="resilience"
              placeholder="resilience"
            >
              {defaultCharacter.resilience}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="constitution">Constitution:</label>
            <br/>
            <h3
              type="text"
              id="constitution"
              placeholder="Constitution"
            >
              {defaultCharacter.constitution}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="exp">Experience:</label>
            <br/>
            <h3
              type="text"
              id="exp"
              placeholder="experience"
            >
              {defaultCharacter.exp}
            </h3>
          </fieldset>
          <fieldset>
            <label htmlFor="level">Level:</label>
            <br/>
            <h3
              type="text"
              id="level"
              placeholder="Level"
            >
              {newCharacter.level}
            </h3>
          </fieldset>
          <button>Save Character</button>
        </form>
      </div>
    );
  };
};

export default CharacterForm;
