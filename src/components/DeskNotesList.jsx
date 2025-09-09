import ListMapper from './ListMapper';

function NotesList({ notes, onSelectNote }) {
  const displayTitle = (note) => {
    return note.title || 'Untitled Note';
  };

  // const priority = 'high' || 'medium' || 'low';

  return (
    <div className="mt-9">
      {notes.length === 0 && (
        <p className="flex flex-col items-center text-2xl mb-10">
          <span className=" text-6xl">📝</span>
          <br />
          <span>No notes yet</span>{' '}
          <span>Create your first note!</span>
        </p>
      )}
      <div className="mb-2">
        <span className="list-priority-tab">high priority</span>
        <ListMapper
          onSelectNote={onSelectNote}
          displayTitle={displayTitle}
          priority={'high'}
        />
      </div>
      <div className="mb-2">
        <span className="list-priority-tab">medium priority</span>
        <ListMapper
          onSelectNote={onSelectNote}
          displayTitle={displayTitle}
          priority={'medium'}
        />
      </div>
      <div className="mb-2">
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
