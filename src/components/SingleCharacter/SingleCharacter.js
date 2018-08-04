import React from 'react';
import PropTypes from 'prop-types';
import characterShape from '../../propz/characterProp';
import './SingleCharacter.css';

class CharacterItem extends React.Component {
  static propTypes = {
    character: characterShape.characterShape,
    index: PropTypes.number,
    onSelect: PropTypes.func,
  };

  characterClick = (e) => {
    e.stopPropagation();
    const {character, onSelect} = this.props;
    onSelect(character.id);
  };

  render () {
    const {character} = this.props;

    return (
      <li onClick={this.characterClick} className="character-card col-sm-3">
        <div className="image-container">
          <img src={character.profilePic} alt={character.name} className="profile-image"/>
          <div className="char-img-frame">
          </div>
        </div>
        <h1>{character.name}</h1>
      </li>

    );
  };
};

export default CharacterItem;
