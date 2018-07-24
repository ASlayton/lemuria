import axios from 'axios';
import constants from '../constants';

const messageGetRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/combatMsg.json`)
      .then(res => {
        const messages = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            messages.push(res.data[fbKey]);
          });
        }
        resolve(messages);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { messageGetRequest };
