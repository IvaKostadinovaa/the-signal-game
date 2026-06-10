import './SplashScreen.css';
import bgImage from '../images/background.jpg';

export default function SplashScreen({ onPlay, onContinue, onHowToPlay }) {
  return (
    <main className="splash" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="splash__content">
        <h1 className="splash__title">
          THE SIGNAL
        </h1>
        <p className="splash__subtitle">TRUTH UNDER PRESSURE</p>
        <p className="splash__description">
          An educational game for media literacy<br />and fighting disinformation
        </p>
        <div className="splash__buttons">
          <button className="splash__btn splash__btn--primary" onClick={onPlay}>
            NEW GAME
          </button>
          <button className="splash__btn splash__btn--secondary" onClick={onContinue}>
            CONTINUE
          </button>
          <button className="splash__btn splash__btn--secondary" onClick={onHowToPlay}>
            HOW TO PLAY
          </button>
        </div>
      </div>
    </main>
  );
}
