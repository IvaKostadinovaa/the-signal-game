// import Masthead from './Masthead.jsx';
// import { TEAM_MEMBERS } from '../game/gameData.js';

// export default function TeamScreen({ onPlay }) {
//   return (
//     <main className="team-screen">
//       <Masthead />

//       <div className="team-content">
//         <h2 className="team-heading">Meet Your Newsroom</h2>
//         <p className="team-subheading">
//           Each voice carries an agenda. Learn who to trust - and when.
//         </p>
//         <hr className="roadmap-rule" />

//         <div className="team-grid">
//           {TEAM_MEMBERS.map((member) => (
//             <div key={member.name} className="character-card">
//               <div
//                 className="character-avatar"
//                 style={{ background: member.color }}
//               >
//                 {member.initials}
//               </div>
//               <h3 className="character-name">{member.name}</h3>
//               <p className="character-role">{member.role}</p>
//               <hr className="character-divider" />
//               <p className="character-bio">{member.bio}</p>
//               <span className="character-alignment">{member.alignment}</span>
//             </div>
//           ))}
//         </div>

//         <div className="team-actions">
//           <button className="cta-button" type="button" onClick={onPlay}>
//             Begin Your Shift &rarr;
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
import Masthead from "./Masthead.jsx";
import { TEAM_MEMBERS } from "../game/gameData.js";
import "./styles/TeamScreen.css";

export default function TeamScreen({ onPlay }) {
  return (
    <main className="team-screen">
      <Masthead />

      <div className="team-content">
        <h2 className="team-heading">Meet Your Newsroom</h2>
        <p className="team-subheading">
          Each voice carries an agenda. Learn who to trust - and when.
        </p>

        <div className="team-grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="character-card">
              <div className="card-image">
                <img src={member.image} alt={member.name} />

                <div className="card-accent" />

                <div className="card-overlay">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="team-actions">
          <button className="cta-button" onClick={onPlay}>
            Begin Your Shift →
          </button>
        </div>
      </div>
    </main>
  );
}
