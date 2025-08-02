import { useNavigate, useParams } from 'react-router';
import Logo from '../components/Logo';
import NoteEditor from '../components/NoteEditor';

function NoteEditPage({ notes, onUpdateNote, showSaved }) {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const noteId = parseInt(id);
  const selectedNote = notes.find(note => note.id === noteId);

  const handleBack = () => {
    navigate('/');
  };

  if (!selectedNote) {
    return (
      <div className="mobile-editor">
        <Logo onBack={handleBack} />
        <div className="p-4 text-center">
          <p>Note not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-editor">
      <Logo
        onBack={handleBack}
        showSaved={showSaved}
      />
      <NoteEditor
        note={selectedNote}
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
}

export default NoteEditPage;