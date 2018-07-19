import React from 'react';
import PropTypes from 'prop-types';
import characterShape from '../../propz/characterProp';
import SingleCharacter from '../SingleCharacter/SingleCharacter';
import './myCurrentCharacters.css';

class MyCurrentCharacters extends React.Component {
  static propTypes = {
    character: PropTypes.arrayOf(characterShape),
    oncharacterSelection: PropTypes.func,
  };

  render () {
    const {characters, onCharacterSelection} = this.props;
    const SingleCharacterComponent = characters.map((character, index) => {
      return (
        <SingleCharacter
          character={characters}
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
      </div>
    );
  }
}

export default MyCurrentCharacters;
