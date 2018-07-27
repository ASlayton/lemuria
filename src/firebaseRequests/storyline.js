import axios from 'axios';
import constants from '../constants';

const storyGetRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/storyline.json`)
      .then(res => {
        const story = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            story.push(res.data[fbKey]);
          });
        }
        resolve(story);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getSingleStoryRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/storyline/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { storyGetRequest, getSingleStoryRequest };
