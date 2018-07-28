import React from 'react';
import './StoryLine.css';
import storyRequest from '../../firebaseRequests/storyline';

class StoryLine extends React.Component {
  state = {
    story: {},
  }
  componentDidMount () {

    console.error(this.props.playerLevel);
    storyRequest.getSingleStoryRequest(this.playerLevel)
      .then((story) => {
        console.error('I am getting something returned for some reason: ', story);
        this.setState({story: story});
      })
      .catch((error) => {
        console.error('Error in getStory', error);
      });
  };

  render () {
    return (
      <div>
        <h1>The Tale Thus Far</h1>
        <div>
          {/* <h3></h3> */}
          {/* <p></p> */}
        </div>
      </div>
    );
  };
};

export default StoryLine;
