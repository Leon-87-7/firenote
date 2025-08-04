import { useNavigate, useParams } from 'react-router';
import SideMenu from '../components/SideMenu';
import NoteEditor from '../components/NoteEditor';

function DesktopLayout({
  notes,
  selectedNoteId,
  onAddNote,
  onUpdateNote,
  showSaved,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentNoteId = id ? parseInt(id) : selectedNoteId;
  const selectedNote = notes.find(
    (note) => note.id === currentNoteId
  );

  const handleSelectNote = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const handleAddNote = () => {
    const newNote = onAddNote();
    navigate(`/note/${newNote.id}`);
  };

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: '350px 1fr' }}
    >
      <SideMenu
        notes={notes}
        selectedNoteId={currentNoteId}
        onAddNote={handleAddNote}
        onSelectNote={handleSelectNote}
        isMobile={false}
      />
      <div className="card">
        <NoteEditor
          showSaved={showSaved}
          note={selectedNote}
          onUpdateNote={onUpdateNote}
          isMobile={false}
        />
      </div>
    </div>
  );
}

export default DesktopLayout;
