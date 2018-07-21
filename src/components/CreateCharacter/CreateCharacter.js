import React from 'react';
import CharacterForm from '../../components/CharacterForm/CharacterForm';
import './CreateCharacter.css';

class CreateCharacter extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Create New Character
        </h1>
        <CharacterForm />
      </div>
    );
  }
};

export default CreateCharacter;
