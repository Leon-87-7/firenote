import { useNavigate } from 'react-router';
import Logo from '../components/Logo';
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
      <Logo />
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