import React from 'react';
import PropTypes from 'prop-types';
import characterShape from '../../propz/characterProp';
import characterRequests from '../../firebaseRequests/characters';
import auth from '../../firebaseRequests/auth';
import './myCurrentCharacters.css';

class myCurrentCharacters extends React.Component {
  static propTypes = {
    character: characterShape,
    index: PropTypes.number,
    onSelect: PropTypes.func,
  };

  characterClick = (e) => {
    e.stopPropagation();
    const {character, onSelect} = this.props;
    onSelect(character.id);
  };

  state = {
    characters: [],
  }
  componentDidMount () {
    const uid = auth.getUid();
    characterRequests
      .getRequest(uid)
      .then((characters) => {
        this.setState({characters});
      })
      .catch((err) => {
        console.error('There was an error in Get Character Request', err);
      });
  }
  render () {
    const characterComponents = this.state.characters.map(character => {
      return (
        <li onClick={this.characterClick}>
          <img src={character.profilePic} alt={character.name} className="profileImg" />
          <h3>{character.name}</h3>
        </li>
      );
    });
    return (
      <div>
        <h1>Current Characters</h1>
        <ul>
          {characterComponents}
        </ul>
      </div>
    );
  }
};

export default myCurrentCharacters;
