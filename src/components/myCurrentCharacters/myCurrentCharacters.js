import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import characterShape from '../../propz/characterProp';
import SingleCharacter from '../SingleCharacter/SingleCharacter';
import './myCurrentCharacters.css';

class MyCurrentCharacters extends React.Component {
  static propTypes = {
    character: PropTypes.arrayOf(characterShape.characterShape),
    oncharacterSelection: PropTypes.func,
  };

  render () {
    const {characters, onCharacterSelection} = this.props;

    const SingleCharacterComponent = characters.map((character, index) => {
      return (
        <SingleCharacter
          className="col-sm-6"
          character={character}
          index={index}
          key={character.id}
          onSelect={onCharacterSelection}
        />
      );
    });

    return (
      <div className="currentCharacters">
        <h2>Existing Characters</h2>
        <ul>
          {SingleCharacterComponent}
        </ul>
        <Link to="/CreateCharacter">Create New Character</Link>
      </div>
    );
  }
}

export default MyCurrentCharacters;