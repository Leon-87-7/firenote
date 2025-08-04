import { useNavigate } from 'react-router';
import SideMenu from '../components/SideMenu';

function NotesListPage({ notes, onAddNote }) {
  const navigate = useNavigate();

  const handleSelectNote = (id) => {
    navigate(`/note/${id}`);
  };

  const handleAddNote = () => {
    const newNote = onAddNote();
    navigate(`/note/${newNote.id}`);
  };

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
