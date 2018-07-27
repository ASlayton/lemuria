import React from 'react';
import './StoryLine.css';
import storyRequest from '../../firebaseRequests/storyline';

class StoryLine extends React.Component {
  state= {
  };

  componentDidMount () {
    console.error('player level: ', this.props.level);
    storyRequest.getSingleStoryRequest(this.state.level)
      .then((story) => {
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
