import axios from 'axios';
import constants from '../constants';

const getSingleFriendRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/friends/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getSingleFriendRequest};
