import React from 'react';
import eventRequests from '../../firebaseRequests/events';
import './Events.css';
import Modal from 'react-modal';
import dieroll from '../../helpers/dieroll';
import enemyRequests from '../../firebaseRequests/enemies';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
class Events extends React.Component {
  constructor () {
    super();
    this.state = {
      events: {},
      modalIsOpen: false,
      myEvent: {},
      enemy: {},
      myEnemyId: '',
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.pickAnEvent = this.pickAnEvent.bind(this);
    this.getEnemy = this.getEnemy.bind(this);
  }

  openModal () {
    this.setState({modalIsOpen: true});
    this.pickAnEvent();
  }

  afterOpenModal () {
    // this.subtitle.style.color = '#f00';
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }
  componentWillMount () {
    Modal.setAppElement('body');
  };

  componentDidMount () {
    eventRequests.eventGetRequest()
      .then((events) => {
        this.setState({events: events});
        this.pickAnEvent();
      })
      .catch((error) => {
        console.error('Error in get events', error);
      });
  };

  pickAnEvent = () => {
    const eventRoll = dieroll(1,99);
    const myEvent = this.state.events[eventRoll];
    this.setState({myEvent: myEvent});
    this.setState({myEnemyId: myEvent.encounter});
    this.getEnemy();
  };

  getEnemy = () => {
    const myEnemyId = this.state.myEnemyId;
    console.error(myEnemyId);
    enemyRequests.getSingleFoeRequest(myEnemyId)
      .then((enemy) => {
        this.setState({enemy: enemy});
      })
      .catch((error) => {
        console.error('Error in getSingleFoe', error);
      });
  };

  render () {
    return (
      <div>
        <button className="btn btn-default" onClick={this.openModal}>Venture Forward</button>
        <button className="btn btn-default"  onClick={this.openModal}>Veer to the left</button>
        <button className="btn btn-default"  onClick={this.openModal}>Veer to the right</button>
        <button className="btn btn-default"  onClick={this.openModal}>Wait</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className={this.state.myEvent.type}
        >
          <button onClick={this.closeModal}><span>&times;</span></button>
          <h1>{this.state.myEvent.type}</h1>
          <div>
            <button className="btn btn-info">Run Away</button>
            <button className="btn btn-danger">Attack</button>
          </div>
        </Modal>
      </div>
    );
  };
};

export default Events;
