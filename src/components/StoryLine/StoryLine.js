import React from 'react';
import './StoryLine.css';
import storyRequest from '../../firebaseRequests/storyline';

class StoryLine extends React.Component {
  state = {
    player: {},
    story: {},
    showIt: '',
    count: 0,
  }
  componentWillReceiveProps (nextProps) {
    const myCurrentChapter = 'chapter' + ((nextProps.playerStatus.level * 1) + 1);
    storyRequest.getSingleStoryRequest(myCurrentChapter)
      .then((story) => {
        this.setState({story});
        this.advanceStory();
      })
      .catch((error) => {
        console.error('Error in getStory', error);
      });
  };

  advanceStory = () => {
    const myNum = this.state.count;
    const showIt = this.state.story.content[myNum];
    this.setState({showIt});
    if (this.state.count <= (this.state.story.content.length - 1)) {
      const count = this.state.count + 1;
      this.setState({count});
    };
  };
  render () {
    return (
      <div>
        <h1>The Tale Thus Far</h1>
        <div>
          <h3>{this.state.story.title}</h3>
          <p>{this.state.showIt}</p>
        </div>
        {this.state.count < 11 &&
          <button onClick={this.advanceStory} className="btn btn-info">Next</button>
        }
      </div>
    );
  };
};

export default StoryLine;
