import { useNavigate, useParams } from 'react-router';
import Logo from '../components/MobileLogo';
import NoteEditor from '../components/NoteEditor';

function NoteEditPage({ notes, onUpdateNote, showSaved }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const noteId = parseInt(id);
  const selectedNote = notes.find((note) => note.id === noteId);

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
          onUpdateNote={onUpdateNote}
          isMobile={true}
        />
      </div>
    </div>
  );
}

export default NoteEditPage;
