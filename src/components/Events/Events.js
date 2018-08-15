import React from 'react';
import eventRequests from '../../firebaseRequests/events';
import './Events.css';
import Modal from 'react-modal';
import dieroll from '../../helpers/dieroll';
import auth from '../../firebaseRequests/auth';
import enemyRequests from '../../firebaseRequests/enemies';
import messageRequests from '../../firebaseRequests/combatMsg';
import characterRequests from '../../firebaseRequests/characters';
import friendRequests from '../../firebaseRequests/friends';
import {ProgressBar} from 'react-bootstrap';
import percentageBar from '../../helpers/percentageBar';

// STYLING FOR THE REACT MODAL
const customStyles = {
  content: {
    margin: '150px 50px',
    backgroundColor: 'white',
    zIndex: 9999,
  },
  overlay: {
    zIndex: 9999,
    backgroundColor: 'rgb(0,0,0,0.75)',
  },
};
class Events extends React.Component {
// SET DEFAULT STATE
  constructor () {
    super();
    this.state = {
      events: {},
      modalIsOpen: false,
      myEvent: {},
      enemy: {},
      friend: {
        name: '',
        text: '',
        bonus: '',
      },
      myEnemyId: '',
      combatMsg: {},
      player: {},

      eDmgResult: 0,
      eGameMsg: '',
      pDmgResult: 0,
      pGameMsg: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.pickAnEvent = this.pickAnEvent.bind(this);
    this.getEnemy = this.getEnemy.bind(this);
  }

  // CALLED WHEN AN EVENT BUTTON IS PUSHED
  openModal () {
    this.setState({modalIsOpen: true});
    this.pickAnEvent();
  }

  // ON MODAL CLOSE
  closeModal () {
    this.props.deathCheck();
    this.setState({eDmgResult: 0});
    this.setState({pDmgResult: 0});
    this.setState({eGameMsg: ''});
    this.setState({pGameMsg: ''});
    this.setState({modalIsOpen: false});
  }

  // DEFINE WHERE MODAL IS
  componentWillMount () {
    Modal.setAppElement('body');
  };

  // WHEN EVENTS COMPONENT MOUNTS, GET EVENT AND GAME MESSAGE DATA FROM FIREBASE TO USE. SET THE INITIAL FOE AND FRIEND SO DATA IS NOT BLANK THE FIRST TIME MODAL IS OPEN.
  componentDidMount () {
    eventRequests.eventGetRequest()
      .then((events) => {
        this.setState({events: events});
        this.getEnemy('foe01');
        this.getFriend('friend01');
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

  // WHEN MODAL OPENS, PICK A RANDOM EVENT AND SET IT TO STATE
  pickAnEvent = () => {
    const eventRoll = dieroll(1,99);
    const myEvent = this.state.events[eventRoll];
    this.setState({myEvent: myEvent});
    this.whoAmICalling();
  };

  // GET DATA OF FRIEND OR FOE DEPENDING ON THE TYPE OF EVENT CHOSEN
  whoAmICalling = () => {
    const myEventType = this.state.myEvent.type;
    if (myEventType === 'meet') {
      this.getFriend(this.state.myEvent.encounter);
    } else if (myEventType === 'combat') {
      this.getEnemy(this.state.myEvent.encounter);
    };
  };

  // GET DATA OF SPECIFIC ENEMY CALLED
  getEnemy = (enemyId) => {
    enemyRequests.getSingleFoeRequest(enemyId)
      .then((enemy) => {
        this.setState({enemy: enemy});
      })
      .catch((error) => {
        console.error('Error in getSingleFoe', error);
      });
  };

  // GET DATA OF SPECIFIC FRIEND CALLED
  getFriend = (friendId) => {
    friendRequests.getSingleFriendRequest(friendId)
      .then((friend) => {
        this.setState({friend: friend});
      })
      .catch((error) => {
        console.error('Error in getSingleFriend', error);
      });
  };

  // WHEN PLAYER PRESSES ATTACK BUTTON
  commenceAtk = () => {
    // PLAYER ROLLS ATTACK
    const attackRoll = dieroll(1, 20) * 1;
    // GET RANDOM NUMBER TO PICK MESSAGE
    const getRandom = dieroll(0,9) * 1;
    // GET ENEMY DEFENSE
    const enemyDefense = this.state.enemy.defense * 1;
    // PLAYER ROLLS CRITICAL MISS - DAMAGES SELF
    if (attackRoll === 1) {
      const playerDmg = dieroll(1, 6);
      const player = Object.assign({}, this.props.player);
      player.currentHealth = player.currentHealth - playerDmg;
      this.setState({player});
      this.setState({pDmgResult: playerDmg});
      const pGameMsg = this.state.combatMsg[1].msg;
      this.setState({pGameMsg});
    // PLAYER ROLLS CRITICAL HIT, DOES DOUBLE DAMAGE
    } else if (attackRoll === 20) {
      const enemyDmg = dieroll(1, 12);
      const enemy = Object.assign({}, this.state.enemy);
      enemy.currentHealth = enemy.currentHealth - enemyDmg;
      this.setState({enemy});
      this.setState({pDmgResult: enemyDmg});
      const pGameMsg = this.state.combatMsg[0].msg;
      this.setState({pGameMsg});
    // PLAYER ATTACK IS >= ENEMY DEFENSE = SUCCESSFUL HIT
    } else if (attackRoll >= enemyDefense) {
      const enemyDmg = dieroll(1, 6);
      const enemy = Object.assign({}, this.state.enemy);
      enemy.currentHealth = enemy.currentHealth - enemyDmg;
      this.setState({enemy});
      this.setState({pDmgResult: enemyDmg});
      const pGameMsg = this.state.combatMsg[12].msg[getRandom];
      this.setState({pGameMsg});
    // PLAYER ATTACK IS < ENEMY DEFENSE = PLAYER MISSES
    } else if (attackRoll < enemyDefense) {
      this.setState({pDmgResult: 0});
      const pGameMsg = this.state.combatMsg[13].msg[getRandom];
      this.setState({pGameMsg});
    } else {
      console.error('Something is not being evaluated correctly.');
    };
    // NOW IT IS THE ENEMIES TURN
    this.evaluateStatus('playerTurn');
  };

  // THE ENEMY STRIKES BACK AT THE PLAYER
  enemyStrikeBack = () => {
    // ROLL FOR ENEMY ATTACK
    const attackRoll = dieroll(1, 20);
    // GET RANDOM NUMBER TO CALL MESSAGE
    const getRandom = dieroll(0,9) * 1;
    // GET PLAYER DEFENSE VALUE
    const playerDefense = this.props.player.defense * 1;
    const playerPsycheDef = this.props.player.fortitude;
    // THERE ARE 2 TYPES OF ENEMIES, THOSE THAT STRIKE HEALTH AND THOSE THAT STRIKE PSYCHE.
    if (this.state.enemy.damageType === 'health') {
      // ENEMY ROLLS CRITICAL MISS, DAMAGES SELF
      if (attackRoll === 1) {
        const enemyDmg = dieroll(1, 6);
        const enemy = Object.assign({}, this.state.enemy);
        enemy.currentHealth = enemy.currentHealth - enemyDmg;
        this.setState({enemy});
        this.setState({eDmgResult: enemyDmg});
        const eGameMsg = this.state.combatMsg[1].msg;
        this.setState({eGameMsg});
      // ENEMY ROLLS CRITICAL HIT, DOES DOUBLE DAMAGE
      } else if (attackRoll === 20) {
        const playerDmg = dieroll(1, 12);
        const player = Object.assign({}, this.props.player);
        player.currentHealth = player.currentHealth - playerDmg;
        this.props.playerHandler(player);
        this.setState({eDmgResult: playerDmg});
        const eGameMsg = this.state.combatMsg[0].msg;
        this.setState({eGameMsg});
      // ENEMY ATTACK ROLL >= PLAYERS DEFENSE
      } else if (attackRoll >= playerDefense) {
        const playerDmg = dieroll(1, 6);
        const player = Object.assign({}, this.props.player);
        player.currentHealth = player.currentHealth - playerDmg;
        this.props.playerHandler(player);
        this.setState({eDmgResult: playerDmg});
        const eGameMsg = this.state.combatMsg[4].msg[getRandom];
        this.setState({eGameMsg});
      // ENEMY ATTACK IS LESS THAN PLAYERS DEFENSE = ENEMY MISS
      } else if (attackRoll < playerDefense) {
        this.setState({eDmgResult: 0});
        const eGameMsg = this.state.combatMsg[5].msg[getRandom];
        this.setState({eGameMsg});
      } else {
        console.error('Something is not being evaluated correctly.');
      };
    // IF ENEMY IS PSYCHE TYPE
    } else if (this.state.enemy.damageType === 'psyche') {
      // ENEMY ROLLS CRITICAL MISS - DAMAGES SELF
      if (attackRoll === 1) {
        const enemyDmg = dieroll(1, 6);
        const enemy = Object.assign({}, this.state.enemy);
        enemy.currentHealth = enemy.currentHealth - enemyDmg;
        this.setState({enemy});
        this.setState({eDmgResult: enemyDmg});
        const eGameMsg = this.state.combatMsg[1].msg;
        this.setState({eGameMsg});
      // ENEMY ROLLS CRITICAL HIT - DOUBLE DAMAGE
      } else if (attackRoll === 20) {
        const playerDmg = dieroll(1, 12);
        const player = Object.assign({}, this.props.player);
        player.currentPsyche = player.currentPsyche - playerDmg;
        this.props.playerHandler(player);
        this.setState({eDmgResult: playerDmg});
        const eGameMsg = this.state.combatMsg[0].msg;
        this.setState({eGameMsg});
      // ENEMY ATTACK ROLL IS >= PLAYER FORTITUDE = SUCCESSFUL HIT
      } else if (attackRoll >= playerPsycheDef) {
        const playerDmg = dieroll(1, 6);
        const player = Object.assign({}, this.props.player);
        player.currentPsyche = player.currentPsyche - playerDmg;
        this.props.playerHandler(player);
        this.setState({eDmgResult: playerDmg});
        const eGameMsg = this.state.combatMsg[6].msg[getRandom];
        this.setState({eGameMsg});
      // ENEMY ATTACK ROLL IS < PLAYER FORTITUDE = MISS
      } else if (attackRoll < playerPsycheDef) {
        this.setState({eDmgResult: 0});
        const eGameMsg = this.state.combatMsg[7].msg[getRandom];
        this.setState({eGameMsg});
      } else {
        console.error('Something is not being evaluated correctly.');
      };

    };
    // CHECK STATUS OF PLAYER AND ENEMY TO DETERMINE NEXT MOVE
    this.evaluateStatus('enemyTurn');
  };

  evaluateStatus = (turn) => {
    // Player is DEAD
    if (this.props.player.currentHealth <= 0) {
      const pGameMsg = this.state.combatMsg[10].msg;
      this.setState({pGameMsg});
      const player = Object.assign({}, this.props.player);
      player.lifeSigns = false;
      this.props.playerHandler(player);
    // ENEMY IS DEAD
    } else if (this.state.enemy.currentHealth <= 0) {
      const eGameMsg = this.state.enemy.DeathMsg;
      this.setState({eGameMsg});
      const player = Object.assign({}, this.props.player);
      player.exp = (player.exp * 1) + (this.state.enemy.xpAwarded * 1);
      this.props.playerHandler(player);
      // ADVANCE PLAYER LEVEL IF ENOUGH XP GAINED
      this.evalXP();
      // PLAYER GOES MAD
    } else if (this.props.player.currentPsyche <= 0) {
      const pGameMsg = this.state.combatMsg[14].msg;
      this.setState({pGameMsg});
      const player = Object.assign({}, this.props.player);
      player.lifeSigns = false;
      this.props.playerHandler(player);
    } else {
      // IF THIS WAS CALLED DURING THE PLAYERS TURN, IT IS NOW THE ENEMIES TURN
      if (turn === 'playerTurn') {
        setTimeout(this.enemyStrikeBack.bind(), 1500);
      } else if (turn === 'enemyTurn') {
        this.evalXP();
      };
    };

    // SAVE PLAYER DATA TO FIREBASE
    const myCharacter = auth.getCharacterId();
    this.putResults(myCharacter, this.props.player);
  };
  // ADVANCE PLAYER LEVEL IF HAVE ENOUGH XP
  evalXP = () => {
    const playerXP = this.props.player.exp;
    const player = Object.assign({}, this.props.player);
    player.level = Math.floor(playerXP * 1 / 1000);
    this.props.playerHandler(player);
  };

  // SAVE PLAYER DATA TO FIREBASE
  putResults = (id, updatedCharacter) => {
    characterRequests
      .characterPutRequest(id, updatedCharacter)
      .then()
      .catch((err) => {
        console.error('error in put request', err);
      });
  };

  // DECIDE WHICH BUTTONS SHOW BASED ON CHARACTER OR ENEMY HEALTH STATUS
  conditionalButtons = () => {
    if (this.props.player.currentHealth <= 0 || this.props.player.currentPsyche <= 0) {
      return (
        <div>
          <h1>You are Dead</h1>
          <button onClick={this.closeModal} className="btn btn-info">Acknowledge</button>
        </div>
      );
    } else if (this.state.enemy.currentHealth <= 0) {
      return (
        <div>
          <h1>You live to fight another day.</h1>
          <button className="btn btn-info" onClick={this.closeModal}>Acknowledge</button>
        </div>
      );
    } else {
      return (
        <div className="actionbtn-container">
          <button  onClick={this.closeModal} className="btn btn-info">Run Away</button>
          <button className="btn btn-danger" onClick={this.commenceAtk}>Attack</button>
        </div>
      );
    }
  };

  // IF YOU MEET A FRIEND IN THE FOREST - YOU GAIN EITHER HEALTH OR PSYCHE
  gimmeHealth = () => {
    const player = {...this.props.player};
    if (this.state.friend.bonus === 'health') {
      player.currentHealth = this.props.player.totalHealth;
      this.props.playerHandler(player);
    } else if (this.state.friend.bonus === 'psyche') {
      player.currentPsyche = this.props.player.totalPsyche;
      this.props.playerHandler(player);
    };
    this.closeModal();
  };

  render () {
    let friendly;
    if (this.state.myEvent.type === 'meet') {
      friendly = true;
    } else {
      friendly = false;
    };
    const didPDamage = this.state.pDmgResult > 0;
    const didEDamage = this.state.eDmgResult > 0;
    return (
      <div className="col-sm-2 col-sm-offset-9">
        <div className="button-container">
          <h1 className="text-center event-btn-head">Choose your path carefully</h1>
          <button className="btn btn-default event-btn" onClick={this.openModal}>Venture Forward</button>
          <button className="btn btn-default event-btn"  onClick={this.openModal}>Veer to the left</button>
          <button className="btn btn-default event-btn"  onClick={this.openModal}>Veer to the right</button>
          <button className="btn btn-default event-btn"  onClick={this.openModal}>Wait</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Events Modal"
          style={customStyles}
        >
          <div>
            {friendly ? (
              <div className="col-sm-8">
                <h3>{this.state.friend.name}</h3>
                <h4>{this.state.friend.text}</h4>
                <button onClick={this.gimmeHealth.bind()} className="btn btn-info">Acknowledge</button>
              </div>
            ) : (
              <div className="col-sm-8 col-sm-offset-2">
                <h4>{this.state.enemy.encounterText}</h4>
                <div className="col-sm-6">
                  <h3>{this.props.player.name}</h3>
                  <h4 className="col-sm-6">Health</h4>
                  <h4 className="text-right col-sm-6">{this.props.player.currentHealth} / {this.props.player.totalHealth}</h4>
                  <ProgressBar className="col-sm-12" bsStyle="warning" now={percentageBar(this.props.player.currentHealth, this.props.player.totalHealth)} />
                  <h4 className="col-sm-6">Psyche:</h4>
                  <h4 className="text-right col-sm-6">{this.props.player.currentPsyche} / {this.props.player.totalPsyche}</h4>
                  <ProgressBar className="col-sm-12" bsStyle="warning" now={percentageBar(this.props.player.currentPsyche, this.props.player.totalPsyche)} />
                </div>
                <div className="col-sm-6">
                  <h3>{this.state.enemy.name}</h3>
                  <h4>{this.state.enemy.description}</h4>
                  <div>
                    <h4 className="text-right">Health: {this.state.enemy.currentHealth}/{this.state.enemy.health}</h4>
                    <ProgressBar  bsStyle="warning" now={percentageBar(this.state.enemy.currentHealth, this.state.enemy.health)}/>
                  </div>
                  <div className="col-sm-6">
                    <p>{this.state.events.eventText}</p>
                    <p>{this.state.enemy.EncounterText}</p>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="col-sm-6">
                    {
                      didPDamage ?
                        <h1 className="itsAHit">{this.state.pDmgResult} dmg</h1> : <div></div>
                    }

                    <h3>{this.state.pGameMsg}</h3>
                  </div>
                  <div className="col-sm-6">
                    {
                      didEDamage ?
                        <h1 className="itsAHit">{this.state.eDmgResult} dmg</h1> : <div></div>
                    }
                    <h3>{this.state.eGameMsg}</h3>
                  </div>
                </div>

                <div className="col-sm-12 modal-btn-container">
                  {this.conditionalButtons()}
                </div>
              </div>
            )
            }
          </div>
        </Modal>
      </div>
    );
  };
};

export default Events;
