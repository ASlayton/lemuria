import React from 'react';
import './StoryLine.css';
import storyRequest from '../../firebaseRequests/storyline';

class StoryLine extends React.Component {
  state= {
    story: {},
    player: {},
  };

  componentDidMount () {
    console.error('player level: ', this.state.player.level);
    storyRequest.getSingleStoryRequest(this.state.player.level)
      .then((story) => {
        this.setState({story: story});
        console.error('story:', story);
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
