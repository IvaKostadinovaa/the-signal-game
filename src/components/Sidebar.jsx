const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="1.5" y="1.5" width="6" height="6" rx="1"/>
    <rect x="10.5" y="1.5" width="6" height="6" rx="1"/>
    <rect x="1.5" y="10.5" width="6" height="6" rx="1"/>
    <rect x="10.5" y="10.5" width="6" height="6" rx="1"/>
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="1.5" y="3" width="15" height="2.5" rx="1"/>
    <rect x="1.5" y="7.75" width="15" height="2.5" rx="1"/>
    <rect x="1.5" y="12.5" width="15" height="2.5" rx="1"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 1.5L2.5 4v5c0 3.5 2.8 6.5 6.5 7.5 3.7-1 6.5-4 6.5-7.5V4L9 1.5z"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="9" cy="5.5" r="3"/>
    <path d="M2.5 16c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2h8v6a4 4 0 01-8 0V2z"/>
    <path d="M5 5H2a2 2 0 002 2M13 5h3a2 2 0 01-3 2M9 12v4M6 16h6"/>
  </svg>
);

const DocIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="3" y="1.5" width="12" height="15" rx="1.5"/>
    <line x1="6" y1="6" x2="12" y2="6"/>
    <line x1="6" y1="9" x2="12" y2="9"/>
    <line x1="6" y1="12" x2="10" y2="12"/>
  </svg>
);

const NAV_ITEMS = [
  { view: 'dashboard',    label: 'DASHBOARD',    icon: <GridIcon /> },
  { view: 'storyQueue',   label: 'STORY QUEUE',  icon: <ListIcon /> },
  { view: 'levelSelect',  label: 'LEVELS',       icon: <ShieldIcon /> },
  { view: 'characters',   label: 'CHARACTERS',   icon: <PersonIcon /> },
  { view: 'achievements', label: 'ACHIEVEMENTS', icon: <TrophyIcon /> },
  { view: 'debrief',      label: 'DEBRIEF',      icon: <DocIcon /> },
];

export default function Sidebar({ activeView, onNavigate, onShowCharacters }) {
  const handleItem = (view) => {
    if (view === 'characters') {
      onShowCharacters();
    } else if (view === 'storyQueue') {
      onNavigate('dashboard');
    } else {
      onNavigate(view);
    }
  };

  const isActive = (view) => {
    if (view === 'storyQueue') return activeView === 'dashboard';
    return activeView === view;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar">👩‍💼</div>
        <span className="sidebar__role">EDITOR-IN-CHIEF</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.view}
            className={`sidebar__item${isActive(item.view) ? ' sidebar__item--active' : ''}`}
            onClick={() => handleItem(item.view)}
          >
            <span className="sidebar__item-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}