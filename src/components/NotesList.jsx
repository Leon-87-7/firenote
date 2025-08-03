import { CaretRight } from 'phosphor-react';

function NotesList({ notes, onSelectNote, isMobile }) {
  const displayTitle = (note) => {
    return note.title || 'Untitled Note';
  };

  return (
    <div className="mt-9">
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex justify-between items-center pl-5 py-2 w-full border-t border-slate-800/15"
          onClick={() => onSelectNote(note.id)}
        >
          <span className="p-1">{displayTitle(note)}</span>
          {isMobile ? (
            <div className="flex items-center btn-ghost cursor-pointer hover:bg-base-200 rounded">
              <span className="p-1">Edit</span>
              <span className="mr-1">
                <CaretRight size={20} />
              </span>
            </div>
          ) : (
            <span className="cursor-pointer p-1 rounded mr-4">
              <CaretRight size={20} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default NotesList;
