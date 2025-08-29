import ListMapper from './ListMapper';

function NotesList({ notes, onSelectNote, isMobile }) {
  const displayTitle = (note) => {
    return note.title || 'Untitled Note';
  };

  // const priority = 'high' || 'medium' || 'low';

  return (
    <div className="mt-9">
      {notes.length === 0 && (
        <div className="capitalize mt-20 text-center font-bold text-xl">
          <div>no notes in the list...</div>
          <br />
          <div className="mt-5 text-3xl">YET!</div>
        </div>
      )}
      <div>
        <span className="list-priority-tab">high priority</span>
        <ListMapper
          onSelectNote={onSelectNote}
          displayTitle={displayTitle}
          priority={'high'}
        />
      </div>
      <div>
        <span className="list-priority-tab">medium priority</span>
        <ListMapper
          onSelectNote={onSelectNote}
          displayTitle={displayTitle}
          priority={'medium'}
        />
      </div>
      <div>
        <span className="list-priority-tab">low priority</span>
        <ListMapper
          onSelectNote={onSelectNote}
          displayTitle={displayTitle}
          priority={'low'}
        />
      </div>
    </div>
  );
}

export default NotesList;
