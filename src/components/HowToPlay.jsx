import './HowToPlay.css';
import investigateImg from '../images/investigate.png';
import analyzeImg from '../images/analyze.png';
import consequencesImg from '../images/consequences.jpg.png';
import decideImg from '../images/decide.png';

const STEPS = [
  {
    icon: investigateImg,
    isImage: true,
    title: 'Investigate',
    desc: 'Use tools to gather evidence and verify your sources.',
  },
  {
    icon: analyzeImg,
    isImage: true,
    title: 'Analyze',
    desc: 'Check sources, images, videos and data for inconsistencies.',
  },
  {
    icon: decideImg,
    isImage: true,
    title: 'Decide',
    desc: 'Publish, delay, or kill the story.',
  },
  {
    icon: consequencesImg,
    isImage: true,
    title: 'Consequences',
    desc: 'Every decision affects 4 metrics.',
  },
];

export default function HowToPlay({ onClose }) {
  return (
    <div className="htp-overlay">
      <div className="htp-card">
        <h2 className="htp-title">HOW TO PLAY</h2>
        <div className="htp-divider" />

        <div className="htp-steps">
          {STEPS.map((s, i) => (
            <div className="htp-step" key={s.title}>
              <span className="htp-step-number">Step {i + 1}</span>
              {s.isImage
                ? <img src={s.icon} alt={s.title} className="htp-icon-img" />
                : <span className="htp-icon">{s.icon}</span>
              }
              <strong className="htp-step-title">{s.title}</strong>
              <p className="htp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="htp-goal">Your goal: <strong>Responsible journalism.</strong></p>

        <button className="htp-btn" onClick={onClose}>GOT IT</button>
      </div>
    </div>
  );
}
