import React from 'react';

class Events extends React.Component {
  render () {
    componentDidMount () {
      eventRequests.getSingleCharacterRequest(myPlayerId)
        .then((character) => {

          this.setState({character: character});
        })
        .catch((error) => {
          console.error('Error in getSinglePlayer', error);
        });
    };
    return (
      <div>
        <h1>Events</h1>
        <div className=""></div>
      </div>
    );
  }
};

export default Events;
