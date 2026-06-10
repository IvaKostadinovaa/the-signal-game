import { createPortal } from 'react-dom';
import './MissionBriefing.css';
import bgImage from '../images/intro.png';

export default function MissionBriefing({ level, onStart }) {
  return createPortal(
    <div className="mb-root">
      <div className="mb-panel" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="mb-gradient" />
        <div className="mb-text">
          <p className="mb-day">Day 1.</p>
          <p className="mb-line">You are the new editor of <strong>The Signal</strong>.</p>
          <p className="mb-line">An encrypted message just arrived from an Anonymous Source.</p>
          <p className="mb-line">Video of Mayor Chen. Ultimatum: <strong>2 hours</strong> — or it goes elsewhere.</p>
        </div>
        <button className="mb-btn" onClick={onStart}>CONTINUE</button>
      </div>
    </div>,
    document.body
  );
}
