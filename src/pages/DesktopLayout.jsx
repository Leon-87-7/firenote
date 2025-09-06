import { useNavigate, useParams } from 'react-router';
import SideMenu from '../components/SideMenu';
import NoteEditor from '../components/DesktopNoteEditor';
import { useNotes } from '../context/NotesContext';
import { useUsers } from '../context/UsersContext';
import UserUI from '../components/UserUI';

function DesktopLayout() {
  const { notes, selectedNoteId, showSaved, addNote, updateNote } =
    useNotes();

  const { SelectedUserId } = useUsers();

  const navigate = useNavigate();
  const { id } = useParams();

  const currentNoteId = id || selectedNoteId;
  const selectedNote = notes.find(
    (note) => note.id === currentNoteId
  );

  const handleSelectNote = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const handleAddNote = async () => {
    const newNote = await addNote();
    if (newNote && newNote.id) {
      navigate(`/note/${newNote.id}`);
    }
  };

  //tow col grid
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
      <div className="card ">
        <UserUI />
        <NoteEditor
          showSaved={showSaved}
          note={selectedNote}
          onUpdateNote={updateNote}
          isMobile={false}
        />
      </div>
    </div>
  );
}

export default DesktopLayout;
