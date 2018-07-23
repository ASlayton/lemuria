import axios from 'axios';
import constants from '../constants';

const eventGetRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/events.json`)
      .then(res => {
        const events = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            events.push(res.data[fbKey]);
          });
        }
        resolve(events);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { eventGetRequest };
