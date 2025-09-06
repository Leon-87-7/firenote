import { useNavigate } from 'react-router';
import { useNotes } from '../context/NotesContext';
import { useUsers } from '../context/UsersContext';
import { ArrowLeft, CaretRight } from 'phosphor-react';
import ThemeToggle from '../components/ThemeToggle';

function NotesListPage() {
  const { notes, addNote } = useNotes();
  const { users, SelectedUserId, setSelectedUserId } = useUsers();
  const navigate = useNavigate();

  const handleSelectNote = (id) => {
    navigate(`/note/${id}`);
  };

  const handleAddNote = async () => {
    const newNote = await addNote();
    if (newNote) {
      navigate(`/note/${newNote.id}`);
    }
  };

  const handleBackToUsers = () => {
    navigate('/');
    setSelectedUserId(null);
  };

  // Get current user name
  const currentUser = users.find(
    (user) => user.id === SelectedUserId
  );
  const userName = currentUser ? currentUser.name : 'User';

  // Group notes by priority
  const groupedNotes = {
    high: notes.filter((note) => note.priority === 'high'),
    medium: notes.filter((note) => note.priority === 'medium'),
    low: notes.filter((note) => note.priority === 'low'),
  };

  const renderNoteGroup = (title, notes) => {
    if (notes.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-base-content">
          {title}
        </h2>
        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-3 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors"
              onClick={() => handleSelectNote(note.id)}
            >
              <span className="text-base-content font-medium">
                {note.title || 'Untitled Note'}
              </span>
              <button className="text-neutral-content text-sm font-medium ">
                <div className="flex items-center btn-ghost cursor-pointer  rounded mr-6">
                  <span className="p-1">Edit</span>
                  <span className="mr-1">
                    <CaretRight size={20} />
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-accent">
        <div className="flex items-center">
          <button
            onClick={handleBackToUsers}
            className="mr-3 p-1"
          >
            <ArrowLeft
              size={20}
              className="text-base-content"
            />
          </button>
          <h1 className="text-xl font-bold text-base-content">
            {userName}
          </h1>
        </div>
        {<ThemeToggle />}
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Add Note Button */}
        <button
          onClick={handleAddNote}
          className="btn bg-gradient-to-bl from-accent to-secondary text-accent-content 
        hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-base-300` dark:focus:ring-base-300 font-medium
        capitalize w-full mb-6"
        >
          + Add Note
        </button>

        {/* Notes grouped by priority */}
        {renderNoteGroup('High Priority', groupedNotes.high)}
        {renderNoteGroup('Medium Priority', groupedNotes.medium)}
        {renderNoteGroup('Low Priority', groupedNotes.low)}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center py-8 text-base-content/60">
            <p>No notes yet. Create your first note!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesListPage;
