import './Home.css';
import React from 'react';
import {Link} from 'react-router-dom';

// THIS IS A LANDING PAGE IF YOU ARE ALREADY SIGNED IN
class Home extends React.Component {
  render () {
    return (
      <div className="introParagraph col-sm-8 col-sm-offset-2">
        <p>Once, there was a land of great beauty and spirit. The people that lived in this land were happy and rejoiced in their home until one day, an unknown being crashed down from the heavens deep within the forest. Setting out to see this marvel and to gauge the destruction wrought to their home the Lemurians gathered.  An outflow of people from the bowels of this great beast brought distress and fear, but with it came advancements and technologies beyond any they had ever dreamed. </p><p>Excited, the Lemurians brought these aliens into their homes and they learned from them. In the space of only a few years, the peoples had grown together, growing beyond their forest. Unaware that the beauty and spirit they had lived with for so long was more than just a setting and with no regard of the harm they were doing to their land, the forest was stripped and developed to make room for more and more people. Generations lived and passed and the spirits watched, growing angrier and more distraught as they watched their home destroyed by these unknowns. </p><p>Having at last reached a breaking point, the spirits revolted, vowing to take back what was thiers and to be rid of the abominations that now roamed. Taking residence in the very machinery they abhorred, they decimated the peoples, pushing the remnants back into their golden cities, and the Lemurians, the few that were left, fled back into the arms of their forest, vowing to never be tempted again by such glamour.</p>
        <p>It is here your story starts, outsider; welcome to Lemuria.</p>
        <Link className="link-style" to="/CharacterScreen">Start Game</Link>
      </div>
    );
  }
};

export default Home;
