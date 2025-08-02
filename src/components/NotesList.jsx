function NotesList({
  notes,
  selectedNoteId,
  onSelectNote,
  isMobile,
}) {
  const displayTitle = (note) => {
    return note.title || 'Untitled Note';
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-item ${selectedNoteId === note.id ? 'selected' : ''}`}
          onClick={() => onSelectNote(note.id)}
        >
          <span className="note-title">{displayTitle(note)}</span>
          {isMobile ? (
            <span className="edit-label">Edit</span>
          ) : (
            <span className="arrow"> › </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default NotesList;
