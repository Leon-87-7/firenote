import { CaretRight } from 'phosphor-react';
import { useNotes } from '../context/NotesContext';

export default function ListMapper({
  displayTitle,
  onSelectNote,
  priority,
}) {
  const { notes, isMobile } = useNotes();
  return (
    <div>
      {notes
        .filter((note) => note.priority === priority)
        .map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center pl-5 py-2 w-full border-t border-primary-content/15
          last:border-b bg-neutral/40"
          >
            <span className="p-1">{displayTitle(note)}</span>
            {isMobile ? (
              <div className="flex items-center btn-ghost cursor-pointer hover:bg-base-200 rounded mr-6">
                <span
                  className="p-1"
                  onClick={() => onSelectNote(note.id)}
                >
                  Edit
                </span>
                <span className="mr-1">
                  <CaretRight size={20} />
                </span>
              </div>
            ) : (
              <span
                className="cursor-pointer p-1 rounded mr-4"
                onClick={() => onSelectNote(note.id)}
              >
                <CaretRight size={20} />
              </span>
            )}
          </div>
        ))}
    </div>
  );
}

{
}
