import './SplashScreen.css';
import bgImage from '../images/background.jpg';

const TICKER_ITEMS = [
  '● BREAKING NEWS',
  '● FAKE REPORT SPREADS ONLINE',
  '● MEDIA LITERACY UNDER THREAT',
  '● DISINFORMATION CAMPAIGN DETECTED',
  '● SOURCES UNVERIFIED',
  '● TRUST IN MEDIA AT ALL-TIME LOW',
  '● BREAKING NEWS',
];

export default function SplashScreen({ onPlay, onContinue, onHowToPlay, hasSave }) {
  return (
    <main className="splash" style={{ '--splash-bg': `url(${bgImage})` }}>
      <div className="news-ticker">
        <span className="news-ticker__label">LIVE</span>
        <div className="news-ticker__track">
          <div className="news-ticker__inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="news-ticker__item">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="splash__content">
        <h1 className="splash__title">
          THE SIGNAL
        </h1>
        <p className="splash__subtitle">
          <span className="word--breaking">BREAKING</span> <span className="word--truth">TRUTH</span> OR <span className="word--breaking">BREAKING</span> <span className="word--trust">TRUST</span>
          <br />
          <span className="word--pressure">UNDER PRESSURE</span>
        </p>
        <p className="splash__description">
          An educational game for media literacy<br />and fighting disinformation
        </p>
        <div className="splash__buttons">
          <button className="splash__btn splash__btn--primary" onClick={onPlay}>
            NEW GAME
          </button>
          {hasSave && (
            <button className="splash__btn splash__btn--secondary" onClick={onContinue}>
              CONTINUE
            </button>
          )}
          <button className="splash__btn splash__btn--secondary" onClick={onHowToPlay}>
            HOW TO PLAY
          </button>
        </div>
      </div>
    </main>
  );
}
