import { createPortal } from 'react-dom';
import chartMisleadingImg from '../images/1_1.png';
import chartCorrectImg from '../images/1_1_1.png';
import mediopolWatchImg from '../images/1_1_3.png';
import transcriptImg from '../images/tools1.1_2.png';
import audioClipImg from '../images/tool_1_1.png';
import transcriptFullImg from '../images/story_1.png';
import clipComparatorImg from '../images/tool1_2.png';
import clipComparatorOrigImg from '../images/story_2.png';
import reverseImageSearchImg from '../images/tools_2.1_1.png';
import electionArticleImg from '../images/tools2.3_1.png';
import electionStatementImg from '../images/tools2.3_2.png';
import deepfakeFrameImg from '../images/tools3.1_1.png';
import deepfakeHeatmapImg from '../images/tools3.1_3.png';
import verificationLogoImg from '../images/verification.png';

// ── Card body components (all defined at module level for stability) ──

const ChartMisleadingBody = () => (
  <img src={chartMisleadingImg} alt="Misleading chart"
    style={{ width: '100%', borderRadius: 8, display: 'block' }}/>
);

const ChartComparisonBars = () => (
  <img src={chartCorrectImg} alt="Real vs published chart"
    style={{ width: '100%', borderRadius: 8, display: 'block' }}/>
);

function MediopolWatchCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, #dbeafe, #2563eb)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>M</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>MediopolWatch</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>@mediopolwatch</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        {[
          { icon: <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><polyline points="6,3.5 6,6 8,7.5"/></svg>, text: 'Account created: 3 days ago' },
          { icon: <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg>, text: 'No prior reports' },
          { icon: <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><circle cx="4" cy="3.5" r="2"/><path d="M1 10c0-2.5 1.8-4 3-4h4c1.2 0 3 1.5 3 4"/></svg>, text: 'Followers: 12,430' },
        ].map(({ icon, text }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {icon}
            </div>
            <span style={{ fontSize: 11.5, color: '#475569' }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="7" cy="7" r="5.5"/>
          <line x1="7" y1="4.5" x2="7" y2="7.5"/>
          <circle cx="7" cy="9.5" r="0.5" fill="#dc2626" stroke="none"/>
        </svg>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#dc2626', letterSpacing: '0.05em' }}>LOW CREDIBILITY</span>
      </div>
    </div>
  );
}

function AudioWaveformBody() {
  const bars = [12,22,18,35,28,42,55,48,38,62,70,58,45,68,72,80,74,65,52,44,36,28,20,14,18,24,32,26,19,15,12,10,11,13,10,12,11,10,12,11];
  const W = 220, H = 54, barW = 3.2, gap = 1.8;
  const clipAt = Math.floor(bars.length * 0.38);
  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 22}`} style={{ display: 'block', marginBottom: 8 }}>
        {bars.map((h, i) => {
          const x = i * (barW + gap);
          const barH = (h / 100) * (H * 0.9);
          const cy = H / 2;
          return (
            <rect key={i} x={x} y={cy - barH / 2} width={barW} height={barH} rx="1"
              fill={i < clipAt ? '#3b82f6' : '#cbd5e1'} opacity={i < clipAt ? 0.9 : 0.45}/>
          );
        })}
        {(() => {
          const mx = clipAt * (barW + gap) + barW / 2;
          return (
            <g>
              <line x1={mx} y1={2} x2={mx} y2={H + 2} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2"/>
              <text x={mx + 4} y={H + 16} fill="#ef4444" fontSize="8" fontWeight="700">Clip ends here</text>
            </g>
          );
        })()}
        {['0:00','0:06','0:12','0:18'].map((t, i) => (
          <text key={i} x={i * (W / 3)} y={H + 7} fill="#94a3b8" fontSize="7" textAnchor={i === 3 ? 'end' : 'start'}>{t}</text>
        ))}
      </svg>
      <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.5, margin: 0 }}>
        Viral clip cuts at <strong style={{ color: '#1e293b' }}>0:07</strong>. Full press conference runs to <strong style={{ color: '#1e293b' }}>0:18</strong>. Key context starts after the cutoff.
      </p>
    </div>
  );
}

const TranscriptBody = () => (
  <img src={transcriptImg} alt="Full transcript"
    style={{ width: '100%', borderRadius: 8, display: 'block' }}/>
);

const ClipComparatorBody = () => (
  <img src={clipComparatorOrigImg} alt="Clip vs full context"
    style={{ width: '100%', borderRadius: 8, display: 'block' }}/>
);

const ReverseSearchBody = () => (
  <img src={reverseImageSearchImg} alt="Reverse image search"
    style={{ width: '100%', borderRadius: 8, display: 'block' }}/>
);

function DateRevealBody() {
  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>Original date</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b' }}>14 Mar 2017</div>
      </div>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </div>
  );
}

function ClaimRealityBody() {
  return (
    <div style={{ border: '1.5px solid #fca5a5', borderRadius: 10, padding: '14px 16px', position: 'relative' }}>
      <div style={{ marginBottom: 14, paddingRight: 40 }}>
        <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 3 }}>Claim in post</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b' }}>Today</div>
      </div>
      <div style={{ borderTop: '1px solid #fca5a5', paddingTop: 14, paddingRight: 40 }}>
        <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 3 }}>Reality</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b' }}>Mar 14, 2017</div>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="13" stroke="#dc2626" strokeWidth="2"/>
          <line x1="15" y1="9" x2="15" y2="17" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="15" cy="21.5" r="1.8" fill="#dc2626"/>
        </svg>
      </div>
    </div>
  );
}

function EXIFDataBody() {
  const rows = [
    { label: 'Date taken', value: '14.03.2017  15:42:11', warn: true },
    { label: 'Camera', value: 'Canon EOS 7D' },
    { label: 'Location', value: 'Skopje, North Macedonia', warn: true },
    { label: 'GPS', value: '41.9981° N, 21.4254° E' },
    { label: 'Edits detected', value: 'None', ok: true },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < rows.length - 1 ? 9 : 0, borderBottom: i < rows.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
          <span style={{ fontSize: 11, color: '#64748b' }}>{row.label}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: row.ok ? '#16a34a' : row.warn ? '#b45309' : '#1e293b', textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function BotAccountBody() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex' }}>
          {['#94a3b8','#64748b','#475569'].map((c, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" fill="#fff"/><path d="M2 13c0-3 2-4.5 5-4.5s5 1.5 5 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          ))}
        </div>
        <span style={{ fontSize: 11.5, color: '#475569' }}>3 accounts created within 48h</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
        {['All posted within 4 minutes','Identical sharing pattern','Same hashtags used'].map((text, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }}/>
            <span style={{ fontSize: 11.5, color: '#475569' }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff1f2', borderRadius: 7, padding: '8px 12px' }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#dc2626" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="5.5" cy="4.5" r="2.2"/><path d="M1 12c0-2.5 1.8-4 4.5-4"/>
          <circle cx="10" cy="4.5" r="2.2"/><path d="M7 12c0-2.5 1.8-4 4.5-4"/>
        </svg>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#dc2626', letterSpacing: '0.04em' }}>Bot-like behavior detected</span>
      </div>
    </div>
  );
}

const ElectionArticleBody = () => (
  <div>
    <img src={electionArticleImg} alt="NewsFirst article"
      style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 10 }}/>
    <p style={{ fontSize: 12, color: '#92400e', lineHeight: 1.6, margin: 0 }}>
      The article references &ldquo;exclusive documents&rdquo; but provides no direct access to them. All claims rely on unnamed sources.
    </p>
  </div>
);

const ElectionStatementBody = () => (
  <div>
    <img src={electionStatementImg} alt="Official statement"
      style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 10 }}/>
    <p style={{ fontSize: 12, color: '#1e293b', lineHeight: 1.65, margin: '0 0 4px' }}>
      The government categorically denies all allegations made by NewsFirst.
    </p>
    <p style={{ fontSize: 12, color: '#1e293b', lineHeight: 1.65, margin: '0 0 8px' }}>
      These claims are false and damaging to the democratic process. Legal action will be taken.
    </p>
    <p style={{ fontSize: 12, color: '#475569', margin: '0 0 12px' }}>Date: 18.04.2023</p>
    <div style={{ border: '1.5px solid #16a34a', borderRadius: 8, padding: '8px 14px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#15803d' }}>
      Verified on gov.mk
    </div>
  </div>
);

function EvidenceChainBody() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 7, padding: '8px 11px', marginBottom: 14 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 1.5L12 11.5H1L6.5 1.5z"/>
          <line x1="6.5" y1="5.5" x2="6.5" y2="8"/>
          <circle cx="6.5" cy="9.5" r="0.5" fill="#d97706" stroke="none"/>
        </svg>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#92400e' }}>No primary documents found</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {['NewsFirst Report', 'Unnamed Sources', 'Public Claim'].map((label, i, arr) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: 6, padding: '6px 20px', fontSize: 11, fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>
              {label}
            </div>
            {i < arr.length - 1 && (
              <svg width="12" height="16" viewBox="0 0 12 16" style={{ display: 'block' }}>
                <line x1="6" y1="0" x2="6" y2="10" stroke="#94a3b8" strokeWidth="1.5"/>
                <polyline points="3,8 6,13 9,8" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontSize: 11.5, color: '#475569', lineHeight: 1.5 }}>
        Evidence gap: <span style={{ fontWeight: 800, color: '#dc2626' }}>HIGH</span> - chain relies entirely on secondary reporting.
      </div>
    </div>
  );
}

const DeepfakeFrameBody = () => (
  <div>
    <img src={deepfakeFrameImg} alt="Frame analysis"
      style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 10 }}/>
    <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, margin: '0 0 10px' }}>
      Blink rate is abnormal and lip movements don&apos;t fully match the audio.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {['Unnatural blink', 'Lip-sync issue', 'Lighting mismatch'].map(label => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid #fca5a5', borderRadius: 8, padding: '8px 12px' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{label}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
      ))}
    </div>
  </div>
);

const DeepfakeHeatmapBody = () => (
  <div>
    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.65, margin: '0 0 16px' }}>
      Posted the day before elections. Benefits a political group.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Timing</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>1 day before elections</span>
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Potential benefit</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
            <line x1="22" y1="2" x2="16" y2="8"/><line x1="17" y1="2" x2="17" y2="8"/><line x1="22" y1="7" x2="16" y2="7"/>
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Political advantage</span>
      </div>
    </div>
  </div>
);

const DeepfakeEmotionBody = () => (
  <div>
    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.65, margin: '0 0 16px' }}>
      The video uses shocking claims to create fear and anger.
    </p>
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px' }}>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Emotion triggered</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Fear, Anger</span>
        <span style={{ fontSize: 26 }}>😡😡</span>
      </div>
    </div>
  </div>
);

// ── Content map ────────────────────────────────────────────────────

const VERIFY_CARDS = {
  'chart-stats': {
    level: 'LEVEL 1', category: 'DATA', accentColor: '#2563eb',
    cards: [
      { title: 'Does this number tell the whole story?', subtitle: 'Numbers can be misleading without context.', Body: () => <div><img src={audioClipImg} alt="Misleading chart" style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 10 }}/><p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>The chart starts at 383, not 0. The real increase is only 4.4%.</p></div> },
      { title: 'Compared to what?', subtitle: 'Check the baseline and comparison period.', Body: () => <div><img src={clipComparatorImg} alt="Compared chart" style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 10 }}/><p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>Official police data shows a stable trend over the same period.</p></div> },
      { title: 'Who wants me to believe this?', subtitle: 'Check the source and their track record.', Body: () => <div><img src={transcriptFullImg} alt="Source credibility" style={{ width: '100%', borderRadius: 8, display: 'block', marginBottom: 10 }}/><p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>@MediopolWatch active for 3 years. 14 reports published.</p></div> },
    ],
    lesson: 'A chart can show real data and still mislead. Always check where the Y-axis starts - a baseline above zero makes small changes look dramatic.',
  },
  'transcript-audio': {
    level: 'LEVEL 1', category: 'AUDIO', accentColor: '#0891b2',
    cards: [
      { title: 'Where does the clip cut off?', subtitle: 'Look at what the clip shows - and what it hides.', Body: AudioWaveformBody },
      { title: 'What does the full transcript say?', subtitle: 'Always check the complete original source.', Body: TranscriptBody },
      { title: 'How does the context change the meaning?', subtitle: 'Clip vs. full statement - compare directly.', Body: ClipComparatorBody },
    ],
    lesson: 'A quote can be technically accurate and completely misleading. Always read the sentence after the one everyone is sharing.',
  },
  'image-forensics': {
    level: 'LEVEL 2', category: 'IMAGE', accentColor: '#7c3aed',
    cards: [
      { title: 'When was this photo actually taken?', subtitle: 'Reverse image search reveals the origin date.', Body: ReverseSearchBody },
      { title: 'When was this really taken?', subtitle: 'The photo is from March 14, 2017.', Body: DateRevealBody },
      { title: 'Does this image prove the claim?', subtitle: 'The post claims "today". This photo is 9 years old.', Body: ClaimRealityBody },
      { title: 'Who is posting this?', subtitle: 'Check account age and coordinated behavior.', Body: BotAccountBody },
    ],
    lesson: 'A real photo can tell a false story. EXIF data, reverse image search, and account age together revealed a 9-year-old protest photo presented as today\'s news.',
  },
  'election-docs': {
    level: 'LEVEL 2', category: 'DOCUMENTS', accentColor: '#b45309',
    note: 'The article references “exclusive documents” but provides no direct access to them. All claims rely on unnamed sources.',
    cards: [
      { title: 'Where are the actual documents?', subtitle: '"Exclusive" claims need accessible evidence.', Body: ElectionArticleBody },
      { title: 'What does the accused side say?', subtitle: 'Both sides of a story must be verified.', Body: ElectionStatementBody },
      { title: 'What is the evidence chain?', subtitle: 'Trace every claim back to a primary source.', Body: EvidenceChainBody },
    ],
    lesson: '"Exclusive documents" with no documents is not a story - it is an allegation. Extraordinary claims require extraordinary evidence.',
  },
  'deepfake': {
    level: 'LEVEL 3', category: 'VIDEO', accentColor: '#dc2626',
    cards: [
      { title: 'Does it look natural?', subtitle: 'Check blink patterns, lip sync, and lighting.', Body: DeepfakeFrameBody },
      { title: 'Why is this appearing now?', subtitle: 'Timing and motive reveal intent behind the video.', Body: DeepfakeHeatmapBody },
      { title: 'What reaction is this trying to trigger?', subtitle: 'Emotional manipulation is a key disinformation tool.', Body: DeepfakeEmotionBody },
    ],
    lesson: 'Near-perfect AI synthesis fools the human eye. Forensic tools are the last line of defense before publication. The most important story was not the video - it was who made it.',
  },
};

// ── Modal shell ────────────────────────────────────────────────────

function VerifyCard({ num, title, subtitle, Body, accentColor }) {
  return (
    <div style={{
      flex: 1, background: '#fff', borderRadius: 12,
      border: '1px solid #e2e8f0',
      padding: '18px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: '#0a1e28', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, flexShrink: 0,
        }}>
          {num}
        </div>
        <div>
          <p style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: '2px 0 5px', lineHeight: 1.3 }}>{title}</p>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: 0, lineHeight: 1.4 }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Body />
      </div>
    </div>
  );
}

export default function VerifyModal({ story, onDecision, onClose }) {
  const content = VERIFY_CARDS[story.verifyType];
  if (!content) return null;

  const { level, category, accentColor, cards, lesson } = content;

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(8,16,28,0.72)',
      backdropFilter: 'blur(6px)',
      zIndex: 450,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 16px',
    }}>
      <div className="verify-modal-box" style={{
        background: '#f8fafc',
        borderRadius: 18,
        width: '100%', maxWidth: 920,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 20px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={verificationLogoImg} alt="Verification" style={{ height: 32, width: 'auto', display: 'block' }}/>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#cc0000', letterSpacing: '0.1em', marginBottom: 2 }}>{level} - {category}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', letterSpacing: '0.06em' }}>VERIFY TOOLS</div>
            </div>
          </div>
          <button type="button" onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22, lineHeight: 1, padding: '2px 6px' }}
            aria-label="Close">×</button>
        </div>

        {/* 3 cards */}
        <div className="verify-cards-row" style={{ display: 'flex', gap: 14, padding: '16px 16px 0' }}>
          {cards.map((card, i) => (
            <VerifyCard key={i} num={i + 1} title={card.title} subtitle={card.subtitle} Body={card.Body} accentColor={accentColor} />
          ))}
        </div>

        {/* Lesson bar */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, margin: '14px 16px', background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 10, padding: '12px 16px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3.5 6L12 17l-3.5-2C6.5 13.5 5 11.5 5 9a7 7 0 0 1 7-7z"/>
          </svg>
          <p style={{ fontSize: 13, color: '#1e293b', margin: 0, lineHeight: 1.65 }}>
            <strong style={{ color: '#d97706' }}>LESSON: </strong>{lesson}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 16px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
          <button type="button" onClick={onClose}
            style={{ background: '#0a1e28', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >Got it</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
