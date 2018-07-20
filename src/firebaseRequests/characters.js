import axios from 'axios';
import constants from '../constants';

const characterGetRequest = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/characters.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const characters = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            characters.push(res.data[fbKey]);
          });
        }
        resolve(characters);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const characterPostRequest = (newCharacter) => {
  return new Promise ((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/characters.json`, newCharacter)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSingleCharacterRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/characters/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const characterDeleteRequest = (characterId) => {
  return new Promise ((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/characters/${characterId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const characterPutRequest = (characterId, updatedcharacter) => {
  return new Promise ((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/characters/${characterId}.json`, updatedcharacter)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { characterGetRequest, characterPostRequest, characterDeleteRequest, characterPutRequest, getSingleCharacterRequest };
