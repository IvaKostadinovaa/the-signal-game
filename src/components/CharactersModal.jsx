export default function CharactersModal({ characters, onClose }) {
  return (
    <div className="modal">
      <div className="modal__header">
        <h3>Characters</h3>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <ul className="modal__character-list">
        {characters.map((c) => (
          <li key={c.initials} className="modal__character">
            <div
              className="modal__character-avatar"
              style={{ background: c.color }}
            >
              {c.initials}
            </div>
            <div className="modal__character-info">
              <strong>{c.name}</strong>
              <span className="modal__character-role">{c.role}</span>
              <p>{c.bio}</p>
              <span className="modal__character-alignment">Alignment: {c.alignment}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
