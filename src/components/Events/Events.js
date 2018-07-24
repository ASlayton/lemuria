import React from 'react';
import eventRequests from '../../firebaseRequests/events';
import './Events.css';
import Modal from 'react-modal';
import dieroll from '../../helpers/dieroll';
import auth from '../../firebaseRequests/auth';
import enemyRequests from '../../firebaseRequests/enemies';
import messageRequests from '../../firebaseRequests/combatMsg';
import characterRequests from '../../firebaseRequests/characters';

class Events extends React.Component {
  constructor () {
    super();
    this.state = {
      events: {},
      modalIsOpen: false,
      myEvent: {},
      enemy: {},
      myEnemyId: '',
      combatMsg: [],
      player: {},
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
    const myPlayerId = auth.getUid();
    eventRequests.eventGetRequest()
      .then((events) => {
        this.setState({events: events});
        this.pickAnEvent();
      })
      .catch((error) => {
        console.error('Error in get events', error);
      });
    messageRequests.messageGetRequest()
      .then((messages) => {
        this.setState({combatMsg: messages});
      })
      .catch((error) => {
        console.error('Error in get combat messages', error);
      });
    characterRequests.getSingleCharacterRequest(myPlayerId)
      .then((myPlayer) => {
        this.setState({player: myPlayer});
      })
      .catch((err) => {
        console.error('Error in get player data in event', err);
      });
  };

  pickAnEvent = () => {
    const eventRoll = dieroll(1,99);
    const myEvent = this.state.events[eventRoll];
    this.setState({myEvent: myEvent});
    this.getEnemy();
  };

  getEnemy = () => {
    const enemyId = this.state.myEvent.encounter;
    console.error('enemyId', enemyId);
    enemyRequests.getSingleFoeRequest(enemyId)
      .then((enemy) => {
        this.setState({enemy: enemy});
        console.error('enemy:', enemy);
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
          contentLabel="Example Modal"
          className={this.state.myEvent.type}
        >
          <h1>{this.state.myEvent.type}</h1>
          <div>
            <div className="col-sm-6">
              <h3>{this.state.enemy.name}</h3>
              <p>{this.state.enemy.description}</p>
            </div>
            <div className="col-sm-6">
              <p>{this.state.events.eventText}</p>
              <p>{this.state.enemy.EncounterText}</p>
            </div>
          </div>
          <div>
            <button  onClick={this.closeModal} className="btn btn-info">Run Away</button>
            <button className="btn btn-danger">Attack</button>
          </div>
        </Modal>
      </div>
    );
  };
};

export default Events;
