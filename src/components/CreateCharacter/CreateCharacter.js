import React from 'react';
import CharacterForm from '../../components/CharacterForm/CharacterForm';
import './CreateCharacter.css';
import {Redirect} from 'react-router-dom';
import auth from '../../firebaseRequests/auth';
import characterRequest from '../../firebaseRequests/characters';

class CreateCharacter extends React.Component {
  state = {
    characters: [],
  }

  formSubmitEvent = (newCharacter) => {
    newCharacter.uid = auth.getUid();
    characterRequest.characterPostRequest(newCharacter)
      .then(() => {
        return (
          <Redirect to="/GameScreen" />
        );
      })
      .catch((err) => {
        console.error('error with Character POST', err);
      });
  };

  render () {
    return (
      <div>
        <h1>
          Create New Character
        </h1>
        <CharacterForm
          onSubmit={this.formSubmitEvent}
        />
      </div>
    );
  }
};

export default CreateCharacter;
