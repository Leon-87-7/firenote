import { useNavigate, useParams } from 'react-router';
import SideMenu from '../components/SideMenu';
import NoteEditor from '../components/NoteEditor';
import SavedIndicator from '../components/SavedIndicator';

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
      style={{ gridTemplateColumns: '320px 1fr' }}
    >
      <SideMenu
        notes={notes}
        selectedNoteId={currentNoteId}
        onAddNote={handleAddNote}
        onSelectNote={handleSelectNote}
        isMobile={false}
      />
      <div className="card">
        {showSaved && <SavedIndicator />}
        <NoteEditor
          note={selectedNote}
          onUpdateNote={onUpdateNote}
        />
      </div>
    </div>
  );
}

export default DesktopLayout;
