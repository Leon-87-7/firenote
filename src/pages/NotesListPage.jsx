import { useNavigate } from 'react-router';
import { useNotes } from '../context/NotesContext';
import SideMenu from '../components/SideMenu';

function NotesListPage() {
  const { notes, addNote } = useNotes();
  const navigate = useNavigate();

  const handleSelectNote = (id) => {
    navigate(`/note/${id}`);
  };

  const handleAddNote = async () => {
    const newNote = await addNote();
    navigate(`/note/${newNote.id}`);
  };

  //mobile list+addBtn layout
  return (
    <div className="mobile-list">
      <SideMenu
        notes={notes}
        onAddNote={handleAddNote}
        onSelectNote={handleSelectNote}
        isMobile={true}
      />
    </div>
  );
}

export default NotesListPage;
