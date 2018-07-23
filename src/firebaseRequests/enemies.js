import axios from 'axios';
import constants from '../constants';

const getSingleFoeRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/enemies/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default getSingleFoeRequest;
