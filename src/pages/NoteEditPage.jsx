import { useNavigate, useParams } from 'react-router';
import { useNotes } from '../context/NotesContext';
import Logo from '../components/MobileLogo';
import NoteEditor from '../components/NoteEditor';

function NoteEditPage() {
  const { notes, showSaved, updateNote } = useNotes();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedNote = notes.find((note) => note.id === id);

  const handleBack = () => {
    navigate('/');
  };

  //note error 404
  if (!selectedNote) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <Logo onBack={handleBack} />
        <div className="border-t border-accent " />
        <div className="p-4 text-center">
          <p>
            <b>404:</b> Note not found
          </p>
        </div>
      </div>
    );
  }

  //mobile editor layout
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Logo onBack={handleBack} />
      <div className="border-t border-accent " />
      <div className="flex-1 min-h-0">
        <NoteEditor
          showSaved={showSaved}
          note={selectedNote}
          onUpdateNote={updateNote}
          isMobile={true}
        />
      </div>
    </div>
  );
}

export default NoteEditPage;
