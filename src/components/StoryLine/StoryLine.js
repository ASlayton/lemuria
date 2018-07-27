import React from 'react';
import './StoryLine.css';
import storyRequest from '../../firebaseRequests/storyline';

class StoryLine extends React.Component {
  componentDidMount () {
    storyRequest.getStoryRequest()
      .then((story) => {
        this.setState({story: story});
      })
      .catch((error) => {
        console.error('Error in getStory', error);
      });
  };

  thusFar () {

  };

  render () {
    return (
      <div>
        <h1>The Tale Thus Far</h1>
        <p>{this.thusFar}</p>
      </div>
    );
  }
};

export default StoryLine;
