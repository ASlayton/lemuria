import React from 'react';
import eventRequests from '../../firebaseRequests/events';
import './Events.css';
import Modal from 'react-modal';
import dieroll from '../../helpers/dieroll';
import auth from '../../firebaseRequests/auth';
import enemyRequests from '../../firebaseRequests/enemies';
import messageRequests from '../../firebaseRequests/combatMsg';
import characterRequests from '../../firebaseRequests/characters';
import {ProgressBar} from 'react-bootstrap';
import percentageBar from '../../helpers/percentageBar';

class Events extends React.Component {

  constructor () {
    super();
    this.state = {
      events: {},
      modalIsOpen: false,
      myEvent: {},
      enemy: {},
      myEnemyId: '',
      combatMsg: {},
      player: {},

      eDmgResult: 1,
      eGameMsg: '',
      pDmgResult: 1,
      pGameMsg: '',
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
    this.props.deathCheck();
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
    messageRequests.messageGetRequest()
      .then((messages) => {
        this.setState({combatMsg: messages});
      })
      .catch((error) => {
        console.error('Error in get combat messages', error);
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
    enemyRequests.getSingleFoeRequest(enemyId)
      .then((enemy) => {
        this.setState({enemy: enemy});
      })
      .catch((error) => {
        console.error('Error in getSingleFoe', error);
      });
  };

  commenceAtk = () => {
    const attackRoll = dieroll(1, 20) * 1;
    const getRandom = dieroll(0,9) * 1;
    const enemyDefense = this.state.enemy.defense * 1;
    if (attackRoll === 1) {
      const playerDmg = dieroll(1, 6);
      const player = Object.assign({}, this.props.player);
      player.currentHealth = player.currentHealth - playerDmg;
      this.setState({player});
      this.setState({pDmgResult: playerDmg});
      const pGameMsg = this.state.combatMsg[7].msg;
      this.setState({pGameMsg});
    } else if (attackRoll === 20) {
      const enemyDmg = dieroll(1, 12);
      const enemy = Object.assign({}, this.state.enemy);
      enemy.currentHealth = enemy.currentHealth - enemyDmg;
      this.setState({enemy});
      this.setState({pDmgResult: enemyDmg});
      const pGameMsg = this.state.combatMsg[6].msg;
      this.setState({pGameMsg});
    } else if (attackRoll >= enemyDefense) {
      const enemyDmg = dieroll(1, 6);
      const enemy = Object.assign({}, this.state.enemy);
      enemy.currentHealth = enemy.currentHealth - enemyDmg;
      this.setState({enemy});
      this.setState({pDmgResult: enemyDmg});
      const pGameMsg = this.state.combatMsg[10].msg[getRandom];
      this.setState({pGameMsg});
    } else if (attackRoll < enemyDefense) {
      this.setState({pDmgResult: 0});
      const pGameMsg = this.state.combatMsg[11].msg[getRandom];
      this.setState({pGameMsg});
    } else {
      console.error('Something is not being evaluated correctly.');
    };
    this.evaluateStatus('playerTurn');
  };

  enemyStrikeBack = () => {
    const attackRoll = dieroll(1, 20);
    const getRandom = dieroll(0,9) * 1;
    const playerDefense = this.props.player.defense * 1;
    if (attackRoll === 1) {
      const enemyDmg = dieroll(1, 6);
      const enemy = Object.assign({}, this.state.enemy);
      enemy.currentHealth = enemy.currentHealth - enemyDmg;
      this.setState({enemy});
      this.setState({eDmgResult: enemyDmg});
      const eGameMsg = this.state.combatMsg[1].msg;
      this.setState({eGameMsg});
    } else if (attackRoll === 20) {
      const playerDmg = dieroll(1, 12);
      const player = Object.assign({}, this.props.player);
      player.currentHealth = player.currentHealth - playerDmg;
      this.props.playerHandler(player);
      this.setState({eDmgResult: playerDmg});
      const eGameMsg = this.state.combatMsg[0].msg;
      this.setState({eGameMsg});
    } else if (attackRoll >= playerDefense) {
      const playerDmg = dieroll(1, 6);
      const player = Object.assign({}, this.props.player);
      player.currentHealth = player.currentHealth - playerDmg;
      this.props.playerHandler(player);
      this.setState({eDmgResult: playerDmg});
      const eGameMsg = this.state.combatMsg[4].msg[getRandom];
      this.setState({eGameMsg});
    } else if (attackRoll < playerDefense) {
      this.setState({eDmgResult: 0});
      const eGameMsg = this.state.combatMsg[5].msg[getRandom];
      this.setState({eGameMsg});
    } else {
      console.error('Something is not being evaluated correctly.');
    };
    this.evaluateStatus('enemyTurn');
  };

  evaluateStatus = (turn) => {
    const myCharacter = auth.getCharacterId();
    this.putResults(myCharacter, this.props.player);
    // Player is DEAD
    if (this.state.player.currentHealth <= 0) {
      const pGameMsg = this.state.combatMsg[8].msg;
      this.setState({pGameMsg});
    // ENEMY IS DEAD
    } else if (this.state.enemy.currentHealth <= 0) {
      const eGameMsg = this.state.enemy.DeathMsg;
      this.setState({eGameMsg});
      const player = Object.assign({}, this.props.player);
      player.exp = (player.exp * 1) + this.state.enemy.ExperienceAwarded;
      this.setState({player});
      this.evalXP();
    } else {
      if (turn === 'playerTurn') {
        this.enemyStrikeBack();
      } else if (turn === 'enemyTurn') {
        this.evalXP();
      };
    };
  };

  evalXP = () => {
    const playerXP = this.props.player.exp;
    const player = Object.assign({}, this.props.player);
    player.level = Math.floor(playerXP / 1000);
    this.setState({player});
  };

  putResults = (id, updatedCharacter) => {
    characterRequests
      .characterPutRequest(id, updatedCharacter)
      .then()
      .catch((err) => {
        console.error('error in put request', err);
      });
  };

  conditionalButtons = () => {
    if (this.props.player.currentHealth <= 0) {
      return (
        <div>
          <h1>You are Dead</h1>
          <button onClick={this.closeModal}>Acknowledge</button>
        </div>
      );
    } else if (this.state.enemy.currentHealth <= 0) {
      return (
        <div>
          <h1>You live to fight another day.</h1>
          <button onClick={this.closeModal}>Acknowledge</button>
        </div>
      );
    } else {
      return (
        <div>
          <button  onClick={this.closeModal} className="btn btn-info">Run Away</button>
          <button className="btn btn-danger" onClick={this.commenceAtk}>Attack</button>
        </div>
      );
    }
  };

  render () {
    return (
      <div>
        <div className="button-container">
          <button className="btn btn-default" onClick={this.openModal}>Venture Forward</button>
          <button className="btn btn-default"  onClick={this.openModal}>Veer to the left</button>
          <button className="btn btn-default"  onClick={this.openModal}>Veer to the right</button>
          <button className="btn btn-default"  onClick={this.openModal}>Wait</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className={this.state.myEvent.type}
        >
          <h1>{this.state.myEvent.type}</h1>
          <div className="col-sm-6">
            <h3>{this.props.player.name}</h3>
            <ProgressBar now={percentageBar(this.props.player.currentHealth, this.props.player.totalHealth)} />
            <ProgressBar now={percentageBar(this.props.player.currentPsyche, this.props.player.totalPsyche)} />
          </div>
          <div className="col-sm-6">
            <div className="col-sm-6">
              <h3>{this.state.enemy.name}</h3>
              <p>{this.state.enemy.description}</p>
              <label htmlFor="">{this.state.enemy.currentHealth}/{this.state.enemy.health}</label>
              <ProgressBar now={percentageBar(this.state.enemy.currentHealth, this.state.enemy.health)}/>
            </div>
            <div className="col-sm-6">
              <p>{this.state.events.eventText}</p>
              <p>{this.state.enemy.EncounterText}</p>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="col-sm-6">
              <h1>{this.state.pDmgResult} dmg</h1>
              <h2>{this.state.pGameMsg}</h2>
            </div>
            <div className="col-sm-6">
              <h1>{this.state.eDmgResult} dmg</h1>
              <h2>{this.state.eGameMsg}</h2>
            </div>
          </div>

          <div className="col-sm-12">
            {this.conditionalButtons()}
          </div>
        </Modal>
      </div>
    );
  };
};

export default Events;
