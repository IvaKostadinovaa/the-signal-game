import { createPortal } from 'react-dom';
import chartMisleadingImg from '../images/tools1_1_chart.png';
import chartCorrectImg from '../images/tools.1.1_chart_correct.png';
import transcriptImg from '../images/tools1.1_2.png';
import clipComparatorImg from '../images/tools2.1_3.png';
import reverseImageSearchImg from '../images/tools_2.1_1.png';
import electionArticleImg from '../images/tools2.3_1.png';
import electionStatementImg from '../images/tools2.3_2.png';
import profilesImg from '../images/profiles.png';
import deepfakeFrameImg from '../images/tools3.1_1.png';
import deepfakeAudioImg from '../images/tools3.1_2.png';
import deepfakeHeatmapImg from '../images/tools3.1_3.png';
import verificationLogoImg from '../images/verification.png';

// ── Crime Stats panels ────────────────────────────────────────────

function ChartAnalyzerPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1,12 4.5,7.5 7.5,9.5 10.5,4.5 14,6.5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Chart Analyzer</span>
      </div>

      <img src={chartMisleadingImg} alt="Published chart (misleading)" style={{ width:'100%', borderRadius:6, marginBottom:7, display:'block' }}/>
      <img src={chartCorrectImg} alt="Corrected chart (baseline = 0)" style={{ width:'100%', borderRadius:6, marginBottom:9, display:'block' }}/>

      <p style={{ fontSize:10.5, color:'#475569', lineHeight:1.5, margin:'0 0 8px' }}>
        Analysis: Baseline manipulation detected.<br/>
        The true increase over the last 7 days is <strong style={{color:'#1e293b'}}>+4.4%</strong>.
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
        <svg width="13" height="13" viewBox="0 0 13 13">
          <circle cx="6.5" cy="6.5" r="6.5" fill="#22c55e"/>
          <polyline points="3,6.5 5.5,9 10,4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <span style={{ fontSize:10, fontWeight:700, color:'#16a34a' }}>Analysis complete</span>
      </div>
    </div>
  );
}

const SOURCE_ITEMS = [
  { warn:false, label:'Account age: 3 days',
    icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><polyline points="6,3.5 6,6 8,7.5"/></svg> },
  { warn:false, label:'No prior reports',
    icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg> },
  { warn:true,  label:'Coordinated reposting',
    icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1.5L11 10.5H1L6 1.5z"/><line x1="6" y1="5.5" x2="6" y2="7.5"/></svg> },
  { warn:true,  label:'Follower growth: +12,430 (in 24h)',
    icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"><path d="M2 10v-.5A3.5 3.5 0 015.5 6H7"/><circle cx="4" cy="3.5" r="2"/><path d="M10 10v-.5a2 2 0 00-1.5-1.93"/><path d="M8 1.13a2 2 0 010 3.74"/></svg> },
];

function SourceCheckerPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="7.5" cy="5" r="2.8"/>
          <path d="M2 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Source Checker</span>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:12, paddingBottom:11, borderBottom:'1px solid #f1f5f9' }}>
        <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,#dbeafe,#2563eb)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1,13 5,8.5 8,10.5 11,5.5 17,7.5"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'#1e293b', lineHeight:1.2 }}>MediopolWatch</div>
          <div style={{ fontSize:10.5, color:'#64748b' }}>@mediopolwatch</div>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:13 }}>
        {SOURCE_ITEMS.map((item, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:20, height:20, borderRadius:5, background:item.warn?'#fef3c7':'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {item.icon}
            </div>
            <span style={{ fontSize:10.5, color:item.warn?'#92400e':'#475569' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:7 }}>
        <span style={{ fontSize:10.5, color:'#64748b', fontWeight:600 }}>Reliability:</span>
        <span style={{ fontSize:10.5, fontWeight:800, background:'#fee2e2', color:'#dc2626', borderRadius:5, padding:'2px 9px', letterSpacing:'0.08em' }}>LOW</span>
      </div>
    </div>
  );
}

const BAR_DATA = [
  [42,47],[44,52],[40,57],[43,61],[41,65],
  [45,68],[42,72],[44,75],[43,78],[46,81],
  [41,83],[43,85],[45,87],[42,89],[44,91],
  [43,93],[41,95],[45,96],[43,98],[44,100],
];

function DataContextPanel() {
  const maxH = 70, bW = 5, gap = 1.5, grpGap = 3;
  const totalW = BAR_DATA.length * (bW * 2 + gap + grpGap) + grpGap;

  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
          <rect x="1" y="9" width="3" height="5" rx="0.5"/>
          <rect x="6" y="5" width="3" height="9" rx="0.5"/>
          <rect x="11" y="1" width="3" height="13" rx="0.5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Data Context</span>
      </div>

      <div style={{ fontSize:9.5, color:'#64748b', fontWeight:600, marginBottom:8 }}>Crime trend (last 30 days)</div>

      <svg width="100%" viewBox={`0 0 ${totalW} ${maxH + 4}`} style={{ display:'block', marginBottom:8 }} preserveAspectRatio="xMidYMid meet">
        {BAR_DATA.map(([off, cla], i) => {
          const x = grpGap + i * (bW * 2 + gap + grpGap);
          const oh = (off / 110) * maxH;
          const ch = (cla / 110) * maxH;
          return (
            <g key={i}>
              <rect x={x} y={maxH - oh} width={bW} height={oh} fill="#1d4ed8" rx="1" opacity="0.85"/>
              <rect x={x + bW + gap} y={maxH - ch} width={bW} height={ch} fill="#93c5fd" rx="1" opacity="0.85"/>
            </g>
          );
        })}
      </svg>

      <div style={{ display:'flex', gap:10, marginBottom:10 }}>
        {[['#1d4ed8','Official police data'],['#93c5fd','MediopolWatch data']].map(([c,l]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:9, height:9, borderRadius:2, background:c, flexShrink:0 }}/>
            <span style={{ fontSize:8.5, color:'#64748b' }}>{l}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:0 }}>
        Baseline period used in report:{' '}
        <strong style={{color:'#1e293b'}}>Different from official reporting period.</strong>
      </p>
      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:'4px 0 0' }}>
        Real trend is stable with minor fluctuations.
      </p>
    </div>
  );
}

// ── Politician Quote panels ───────────────────────────────────────

function FullTranscriptPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="1.5" width="11" height="12" rx="1.5"/>
          <line x1="4.5" y1="5" x2="10.5" y2="5"/>
          <line x1="4.5" y1="7.5" x2="10.5" y2="7.5"/>
          <line x1="4.5" y1="10" x2="8" y2="10"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Full Transcript</span>
      </div>

      <img src={transcriptImg} alt="Full transcript excerpt" style={{ width:'100%', borderRadius:6, marginBottom:10, display:'block' }}/>

      <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 1a4 4 0 100 8A4 4 0 005 1z"/>
          <line x1="5" y1="3.5" x2="5" y2="5.5"/>
          <line x1="5" y1="7" x2="5" y2="7.1"/>
        </svg>
        <span style={{ fontSize:10, color:'#16a34a', fontWeight:600 }}>Source: </span>
        <span style={{ fontSize:10, color:'#2563eb', textDecoration:'underline', cursor:'default' }}>gov.mk/transcripts/4521</span>
      </div>

      <p style={{ fontSize:10, color:'#64748b', lineHeight:1.5, margin:0, borderTop:'1px solid #f1f5f9', paddingTop:8 }}>
        Full context changes the meaning of the quote significantly.
      </p>
    </div>
  );
}

function AudioAnalysisPanel() {
  // Waveform bars — alternating heights to mimic voice pattern
  const bars = [12,22,18,35,28,42,55,48,38,62,70,58,45,68,72,80,74,65,52,44,36,28,20,14,18,24,32,26,19,15,12,10,11,13,10,12,11,10,12,11];
  const totalBars = bars.length;
  const W = 220, H = 54;
  const barW = 3.2, gap = 1.8;
  const clipAt = Math.floor(totalBars * 0.38); // ~0:07 in 0:18

  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="7.5" x2="3" y2="7.5"/>
          <line x1="3" y1="4" x2="3" y2="11"/>
          <line x1="3" y1="7.5" x2="5" y2="7.5"/>
          <line x1="5" y1="2" x2="5" y2="13"/>
          <line x1="5" y1="7.5" x2="7" y2="7.5"/>
          <line x1="7" y1="5" x2="7" y2="10"/>
          <line x1="7" y1="7.5" x2="9" y2="7.5"/>
          <line x1="9" y1="3" x2="9" y2="12"/>
          <line x1="9" y1="7.5" x2="11" y2="7.5"/>
          <line x1="11" y1="6" x2="11" y2="9"/>
          <line x1="11" y1="7.5" x2="14" y2="7.5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Audio Analysis</span>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H + 22}`} style={{ display:'block', marginBottom:9 }}>
        {bars.map((h, i) => {
          const x = i * (barW + gap);
          const barH = (h / 100) * (H * 0.9);
          const cy = H / 2;
          const isBeforeClip = i < clipAt;
          return (
            <g key={i}>
              <rect x={x} y={cy - barH / 2} width={barW} height={barH} rx="1"
                fill={isBeforeClip ? '#3b82f6' : '#cbd5e1'} opacity={isBeforeClip ? 0.85 : 0.5}/>
            </g>
          );
        })}
        {/* Clip marker line */}
        {(() => {
          const markerX = clipAt * (barW + gap) + barW / 2;
          return (
            <g>
              <line x1={markerX} y1={2} x2={markerX} y2={H + 2}
                stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2"/>
              <text x={markerX + 4} y={H + 16} fill="#ef4444" fontSize="8" fontWeight="700">Clip ends here</text>
            </g>
          );
        })()}
        {/* Time axis */}
        {['0:00','0:06','0:12','0:18'].map((t, i) => (
          <text key={i} x={i * (W / 3)} y={H + 7} fill="#94a3b8" fontSize="7" textAnchor={i === 3 ? 'end' : 'start'}>{t}</text>
        ))}
      </svg>

      <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:9 }}>
        {[
          'Clip cuts before explanatory clause.',
          'Semantic reversal detected after cutoff point.',
        ].map((txt, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
            <div style={{ width:4, height:4, borderRadius:'50%', background:'#64748b', marginTop:4, flexShrink:0 }}/>
            <span style={{ fontSize:10.5, color:'#475569', lineHeight:1.5 }}>{txt}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <svg width="13" height="13" viewBox="0 0 13 13">
          <circle cx="6.5" cy="6.5" r="6.5" fill="#22c55e"/>
          <polyline points="3,6.5 5.5,9 10,4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <span style={{ fontSize:10, fontWeight:700, color:'#16a34a' }}>Confidence: High</span>
      </div>
    </div>
  );
}

function ClipComparatorPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="13" height="9" rx="1.5"/>
          <polyline points="6,6 10,7.5 6,9"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Clip Comparator</span>
      </div>

      <img src={clipComparatorImg} alt="Short clip vs full context comparison" style={{ width:'100%', borderRadius:6, marginBottom:10, display:'block' }}/>

      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:'0 0 4px' }}>
        Key context starts at <strong style={{color:'#1e293b'}}>0:07</strong>.
      </p>
      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:0 }}>
        The meaning of the statement changes after this point.
      </p>
    </div>
  );
}

// ── Mayor Chen Image panels ───────────────────────────────────────

function ReverseImageSearchPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
          <rect x="1" y="3" width="13" height="10" rx="1.5"/>
          <circle cx="5.5" cy="7" r="1.8"/>
          <polyline points="1,12 5,8.5 7.5,10.5 10.5,7 14,10"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Reverse Image Search</span>
      </div>

      <img src={reverseImageSearchImg} alt="Reverse image search results" style={{ width:'100%', borderRadius:6, marginBottom:9, display:'block' }}/>

      <div style={{ borderTop:'1px solid #f1f5f9', paddingTop:8 }}>
        <div style={{ fontSize:10, color:'#475569', marginBottom:3 }}>
          Earliest match found:{' '}
          <span style={{ color:'#16a34a', fontWeight:700 }}>2017 environmental protest in Skopje.</span>
        </div>
        <div style={{ fontSize:10, color:'#64748b' }}>Date: 14.03.2017</div>
      </div>
    </div>
  );
}

const EXIF_ROWS = [
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"><rect x="1" y="2" width="10" height="9" rx="1"/><line x1="1" y1="5" x2="11" y2="5"/><line x1="4" y1="1" x2="4" y2="3"/><line x1="8" y1="1" x2="8" y2="3"/></svg>, label:'Date taken', value:'14.03.2017  15:42:11' },
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"><circle cx="6" cy="6" r="4.5"/><circle cx="6" cy="6" r="1.5"/></svg>, label:'Camera', value:'Canon EOS 7D' },
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"><ellipse cx="6" cy="6" rx="5" ry="3"/><line x1="1" y1="6" x2="11" y2="6"/></svg>, label:'Lens', value:'18-135mm' },
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1a4 4 0 014 4c0 3-4 7-4 7S2 8 2 5a4 4 0 014-4z"/><circle cx="6" cy="5" r="1.3"/></svg>, label:'Location', value:'Skopje, North Macedonia' },
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/></svg>, label:'GPS', value:'41.9981° N, 21.4254° E' },
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10V4l4-3 4 3v6H8V7H4v3z"/></svg>, label:'File size', value:'2.3 MB' },
  { icon: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 4.5,9 10,3"/></svg>, label:'No edits detected', value:null, ok:true },
];

function EXIFReaderPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1.5" y="1.5" width="12" height="12" rx="1.5"/>
          <rect x="4" y="4" width="7" height="7" rx="0.8"/>
          <line x1="4" y1="7.5" x2="11" y2="7.5"/>
          <line x1="7.5" y1="4" x2="7.5" y2="11"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>EXIF Reader</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
        {EXIF_ROWS.map((row, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, paddingBottom: i < EXIF_ROWS.length-1 ? 7 : 0, borderBottom: i < EXIF_ROWS.length-1 ? '1px solid #f8fafc' : 'none' }}>
            <div style={{ width:20, height:20, borderRadius:5, background: row.ok ? '#f0fdf4' : '#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {row.icon}
            </div>
            <span style={{ fontSize:10.5, color:'#64748b', minWidth:row.value ? 72 : 'auto', flexShrink:0 }}>{row.label}</span>
            {row.value && <span style={{ fontSize:10.5, color:'#1e293b', fontWeight:600, marginLeft:'auto', textAlign:'right' }}>{row.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

const PROFILE_ITEMS = [
  { warn:false, label:'3 accounts created within 48h',
    icon: <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="4" r="2.2"/><path d="M1 12c0-2.5 1.8-4 4-4"/><circle cx="10" cy="4" r="2.2"/><path d="M7 12c0-2.5 1.8-4 4-4"/></svg> },
  { warn:false, label:'All posted within 4 minutes',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><polyline points="6,3.5 6,6 8,7.5"/></svg> },
  { warn:false, label:'Identical sharing pattern',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="2.5" r="1.5"/><circle cx="2" cy="6" r="1.5"/><circle cx="10" cy="9.5" r="1.5"/><line x1="3.4" y1="5.2" x2="8.6" y2="3.3"/><line x1="3.4" y1="6.8" x2="8.6" y2="8.7"/></svg> },
  { warn:false, label:'Same hashtags used',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="1.5" x2="3" y2="10.5"/><line x1="9" y1="1.5" x2="8" y2="10.5"/><line x1="1.5" y1="4.5" x2="10.5" y2="4.5"/><line x1="1.5" y1="7.5" x2="10.5" y2="7.5"/></svg> },
];

function ProfileAnalyzerPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="7.5" cy="5" r="2.8"/>
          <path d="M2 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Profile Analyzer</span>
      </div>

      {/* 3 account avatars */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:13, paddingBottom:11, borderBottom:'1px solid #f1f5f9' }}>
        <img src={profilesImg} alt="3 accounts" style={{ height:32, width:'auto', display:'block' }}/>
        <span style={{ fontSize:10.5, color:'#475569' }}>3 accounts created within 48h</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
        {PROFILE_ITEMS.slice(1).map((item, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:22, height:22, borderRadius:5, background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {item.icon}
            </div>
            <span style={{ fontSize:10.5, color:'#475569' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:7, background:'#fff1f2', borderRadius:7, padding:'7px 10px' }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#dc2626" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="5.5" cy="4.5" r="2.2"/>
          <path d="M1 12c0-2.5 1.8-4 4.5-4"/>
          <circle cx="10" cy="4.5" r="2.2"/>
          <path d="M7 12c0-2.5 1.8-4 4.5-4"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#dc2626', letterSpacing:'0.06em' }}>Bot-like behavior detected</span>
      </div>
    </div>
  );
}

// ── Modal shell ───────────────────────────────────────────────────

// ── Election Docs panels ──────────────────────────────────────────

function ArticleBreakdownPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="1.5" width="11" height="12" rx="1.5"/>
          <line x1="4.5" y1="5" x2="10.5" y2="5"/>
          <line x1="4.5" y1="7.5" x2="10.5" y2="7.5"/>
          <line x1="4.5" y1="10" x2="8" y2="10"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Article Breakdown</span>
      </div>

      <img src={electionArticleImg} alt="NewsFirst exclusive article" style={{ width:'100%', borderRadius:6, marginBottom:10, display:'block' }}/>

      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:0, borderTop:'1px solid #f1f5f9', paddingTop:8 }}>
        The article references "exclusive documents" but provides no direct access to them.
        All claims rely on unnamed sources.
      </p>
    </div>
  );
}

function OfficialStatementPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="12" width="13" height="2" rx="0.5"/>
          <rect x="3" y="5" width="2" height="7"/>
          <rect x="6.5" y="5" width="2" height="7"/>
          <rect x="10" y="5" width="2" height="7"/>
          <path d="M1 5L7.5 1.5 14 5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Official Statement</span>
      </div>

      <img src={electionStatementImg} alt="Government of Mediopol official statement" style={{ width:'100%', borderRadius:6, marginBottom:10, display:'block' }}/>

      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:'0 0 6px' }}>
        The government categorically denies all allegations made by NewsFirst.
      </p>
      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:'0 0 9px' }}>
        These claims are false and damaging to the democratic process. Legal action will be taken.
      </p>
      <div style={{ fontSize:10, color:'#64748b', marginBottom:9 }}>Date: <strong style={{color:'#1e293b'}}>18.04.2023</strong></div>
      <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:7, padding:'7px 12px', textAlign:'center' }}>
        <span style={{ fontSize:10, fontWeight:700, color:'#16a34a' }}>Verified on gov.mk</span>
      </div>
    </div>
  );
}

function EvidenceGapPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="1.5" width="11" height="12" rx="1.5"/>
          <line x1="4.5" y1="5" x2="10.5" y2="5"/>
          <line x1="4.5" y1="7.5" x2="8" y2="7.5"/>
          <path d="M10 10l2 2M10 12l2-2"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Evidence Gap Scan</span>
      </div>

      {/* Warning banner */}
      <div style={{ display:'flex', alignItems:'center', gap:7, background:'#fffbeb', border:'1px solid #fde68a', borderRadius:7, padding:'7px 10px', marginBottom:13 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 1.5L12 11.5H1L6.5 1.5z"/>
          <line x1="6.5" y1="5.5" x2="6.5" y2="8"/>
          <circle cx="6.5" cy="9.5" r="0.5" fill="#d97706" stroke="none"/>
        </svg>
        <span style={{ fontSize:10, fontWeight:700, color:'#92400e' }}>No primary documents available</span>
      </div>

      {/* Evidence chain flowchart */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0, marginBottom:13 }}>
        {[
          'NewsFirst Report',
          'Unnamed Sources',
          'Public Claim',
        ].map((label, i, arr) => (
          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{
              background:'#f8fafc', border:'1.5px solid #cbd5e1', borderRadius:6,
              padding:'5px 18px', fontSize:10, fontWeight:600, color:'#334155',
              whiteSpace:'nowrap',
            }}>{label}</div>
            {i < arr.length - 1 && (
              <svg width="12" height="16" viewBox="0 0 12 16" style={{ display:'block' }}>
                <line x1="6" y1="0" x2="6" y2="10" stroke="#94a3b8" strokeWidth="1.5"/>
                <polyline points="3,8 6,13 9,8" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>

      <p style={{ fontSize:10, color:'#475569', lineHeight:1.55, margin:'0 0 8px', borderTop:'1px solid #f1f5f9', paddingTop:8 }}>
        Information chain relies entirely on secondary reporting.
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
        <span style={{ fontSize:10, color:'#64748b', fontWeight:600 }}>Evidence gap:</span>
        <span style={{ fontSize:10, fontWeight:800, color:'#dc2626', letterSpacing:'0.06em' }}>HIGH</span>
      </div>
    </div>
  );
}

// ── Deepfake panels ───────────────────────────────────────────────

function FrameInspectorPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="13" height="9" rx="1.5"/>
          <path d="M5 3V2M10 3V2"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Frame Inspector</span>
      </div>
      <img src={deepfakeFrameImg} alt="Frame analysis" style={{ width:'100%', borderRadius:7, display:'block', marginBottom:8 }}/>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        {['Blink anomaly','Lighting mismatch','Lip-sync issue'].map(label => (
          <span key={label} style={{ fontSize:9.5, color:'#ef4444', fontWeight:600, textAlign:'center', flex:1 }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function AudioScannerPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 7.5h2l2-4 2 8 2-4 2 4 1-4h1"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Audio Scanner</span>
      </div>
      <img src={deepfakeAudioImg} alt="Audio waveform analysis" style={{ width:'100%', borderRadius:7, display:'block', marginBottom:10 }}/>
      <p style={{ fontSize:10.5, color:'#475569', lineHeight:1.5, margin:'0 0 8px' }}>
        Non-natural waveform smoothing detected.<br/>Missing micro-pauses in speech.
      </p>
      <div style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="6" fill="#22c55e"/></svg>
        <span style={{ fontSize:10.5, fontWeight:700, color:'#16a34a' }}>Confidence: High</span>
      </div>
    </div>
  );
}

function MetadataScannerPanel() {
  const rows = [
    { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', text: 'Location mismatch: Claimed Belgrade, metadata shows different coordinates.' },
    { icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V6h2z', text: 'Timestamp inconsistency detected.' },
    { icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z', text: 'File structure unusual for real camera footage.' },
  ];
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="11" height="11" rx="2"/>
          <line x1="5" y1="5" x2="10" y2="5"/>
          <line x1="5" y1="8" x2="10" y2="8"/>
          <line x1="5" y1="11" x2="8" y2="11"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Metadata Scanner</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display:'flex', gap:7, alignItems:'flex-start' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ fontSize:10.5, color:'#475569', lineHeight:1.5 }}>{r.text}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize:10.5, fontWeight:700, color:'#1e293b' }}>
        Manipulation likelihood: <span style={{ color:'#ef4444' }}>High</span>
      </div>
    </div>
  );
}

function SourceTimelinePanel() {
  const points = [
    { label:'Upload', time:'12:01', x:20 },
    { label:'First reposts', time:'12:04', x:90 },
    { label:'Viral spread', time:'12:08', x:160 },
    { label:'Analysis start', time:'12:47', x:232 },
  ];
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="7.5" r="6"/><polyline points="7.5,4.5 7.5,7.5 9.5,9.5"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Source Timeline</span>
      </div>
      <svg viewBox="0 0 252 54" width="100%" style={{ display:'block', marginBottom:10 }}>
        <line x1="20" y1="27" x2="232" y2="27" stroke="#4f46e5" strokeWidth="2"/>
        {points.map(p => (
          <g key={p.label}>
            <circle cx={p.x} cy="27" r="4.5" fill="#fff" stroke="#4f46e5" strokeWidth="2"/>
            <circle cx={p.x} cy="27" r="2" fill="#4f46e5"/>
            <text x={p.x} y="14" textAnchor="middle" fill="#1e293b" fontSize="7.5" fontWeight="600">{p.label}</text>
            <text x={p.x} y="44" textAnchor="middle" fill="#64748b" fontSize="8">{p.time}</text>
          </g>
        ))}
      </svg>
      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {['Anonymous upload precedes virality by minutes.','Multiple simultaneous reposts detected.','Analysis delay unusually high.'].map(t => (
          <div key={t} style={{ display:'flex', gap:5, alignItems:'flex-start' }}>
            <span style={{ color:'#94a3b8', fontSize:11, lineHeight:1, marginTop:2 }}>·</span>
            <span style={{ fontSize:10.5, color:'#475569', lineHeight:1.5 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompressionAnalyzerPanel() {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="1" width="13" height="13" rx="2"/>
          <rect x="4" y="4" width="3" height="3"/>
          <rect x="8" y="8" width="3" height="3"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Compression Analyzer</span>
      </div>
      <div style={{ fontSize:10, color:'#64748b', marginBottom:8 }}>Heatmap of compression artifacts</div>
      <img src={deepfakeHeatmapImg} alt="Compression heatmap" style={{ width:'100%', borderRadius:7, display:'block', marginBottom:10 }}/>
      <p style={{ fontSize:10.5, color:'#475569', lineHeight:1.5, margin:0 }}>
        Compression signature matches AI-generated video patterns.
      </p>
    </div>
  );
}

function ForensicIndicatorsPanel() {
  const indicators = [
    'AI-generated facial patterns',
    'Edge inconsistencies detected',
    'Lighting direction inconsistent',
    'Background noise: Synthetic',
    'Multiple artifacts detected',
  ];
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', padding:'13px 14px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="1" width="9" height="13" rx="1.5"/>
          <line x1="5.5" y1="5" x2="9.5" y2="5"/>
          <line x1="5.5" y1="7.5" x2="9.5" y2="7.5"/>
          <line x1="5.5" y1="10" x2="7.5" y2="10"/>
        </svg>
        <span style={{ fontSize:10.5, fontWeight:800, color:'#1e293b', letterSpacing:'0.07em' }}>Forensic Indicators</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:12 }}>
        {indicators.map(ind => (
          <div key={ind} style={{ display:'flex', alignItems:'center', gap:7 }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="7" fill="#ef4444"/>
              <polyline points="4,7 6,9 10,5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize:10.5, color:'#475569' }}>{ind}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize:10.5, fontWeight:700, color:'#1e293b' }}>
        Overall assessment: <span style={{ color:'#ef4444' }}>Likely Fake</span>
      </div>
    </div>
  );
}

const PANEL_MAP = {
  'chart-stats':      [ChartAnalyzerPanel, SourceCheckerPanel, DataContextPanel],
  'transcript-audio': [FullTranscriptPanel, AudioAnalysisPanel, ClipComparatorPanel],
  'image-forensics':  [ReverseImageSearchPanel, EXIFReaderPanel, ProfileAnalyzerPanel],
  'election-docs':    [ArticleBreakdownPanel, OfficialStatementPanel, EvidenceGapPanel],
  'deepfake':         [FrameInspectorPanel, AudioScannerPanel, MetadataScannerPanel, SourceTimelinePanel, CompressionAnalyzerPanel, ForensicIndicatorsPanel],
};

export default function VerifyModal({ story, onDecision, onClose }) {
  const panels = PANEL_MAP[story.verifyType];
  if (!panels) return null;

  return createPortal(
    <div style={{
      position:'fixed', inset:0,
      background:'rgba(8,16,28,0.72)',
      backdropFilter:'blur(6px)',
      zIndex:450,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'20px 16px',
    }}>
      <div style={{
        background:'#f0f4f8',
        borderRadius:18,
        width:'100%', maxWidth: panels.length > 3 ? 980 : 870,
        overflow:'hidden',
        boxShadow:'0 32px 80px rgba(0,0,0,0.45)',
      }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 18px', background:'#fff', borderBottom:'1px solid #e2e8f0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <img src={verificationLogoImg} alt="Verification" style={{ height:36, width:'auto', display:'block' }}/>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:'#1e293b', letterSpacing:'0.08em' }}>VERIFICATION REPORT</div>
              <div style={{ fontSize:12, color:'#64748b' }}>{story.title || story.headline}</div>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#94a3b8', fontSize:22, lineHeight:1, padding:'2px 6px' }} aria-label="Close">×</button>
        </div>

        {/* Panels */}
        <div style={{
          display: panels.length > 3 ? 'grid' : 'flex',
          gridTemplateColumns: panels.length > 3 ? 'repeat(3, 1fr)' : undefined,
          gap:12, padding:'14px 14px 12px', flexWrap:'wrap'
        }}>
          {panels.map((Panel, i) => <Panel key={i}/>)}
        </div>

        {/* Footer */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 14px 14px', background:'#fff', borderTop:'1px solid #e2e8f0' }}>
          <span style={{ flex:1, fontSize:11, color:'#64748b' }}>Based on this analysis — what is your decision?</span>
          <button type="button" onClick={() => onDecision('publish')}
            style={{ background:'#f1f5f9', color:'#475569', border:'1.5px solid #e2e8f0', borderRadius:10, padding:'10px 16px', fontSize:11, fontWeight:800, letterSpacing:'0.1em', cursor:'pointer' }}
            onMouseOver={e => e.currentTarget.style.background='#e2e8f0'}
            onMouseOut={e => e.currentTarget.style.background='#f1f5f9'}
          >PUBLISH ANYWAY</button>
          <button type="button" onClick={() => onDecision('verify')}
            style={{ background:'#2563eb', color:'#fff', border:'none', borderRadius:10, padding:'10px 18px', fontSize:11, fontWeight:800, letterSpacing:'0.1em', cursor:'pointer' }}
            onMouseOver={e => e.currentTarget.style.opacity='0.88'}
            onMouseOut={e => e.currentTarget.style.opacity='1'}
          >HOLD — VERIFY FURTHER</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
