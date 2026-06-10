import React from "react";
import "../styles/SignalHome.css";

export default function SignalHome() {
  return (
    <div className="container">
      <div className="overlay">
        <div className="header">
          <h1>
            <span className="light">THE</span> SIGNAL
          </h1>
          <p className="subtitle">
            Breaking News or <br /> Breaking Trust?
          </p>
        </div>

        <div className="tags">
          <span className="tag blue">Media Literacy</span>
          <span className="tag purple">AI Literacy</span>
          <span className="tag orange">Crisis Communication</span>
          <span className="tag green">Non-Violent Communication</span>
        </div>

        <button className="play-btn">
          PLAY ▶
        </button>

        <div className="footer-buttons">
          <button className="small-btn">⚙ SETTINGS</button>
          <button className="small-btn">ℹ ABOUT</button>
          <button className="small-btn">👥 CREDITS</button>
        </div>
      </div>
    </div>
  );
}