import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useNotes } from '../context/NotesContext';
import { ArrowLeft } from 'phosphor-react';
import ThemeToggle from '../components/ThemeToggle';
import SavedToast from '../components/SavedToast';

function NoteEditPage() {
  const { notes, showSaved, updateNote } = useNotes();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedNote = notes.find((note) => note.id === id);

  // Local state for form inputs
  const [title, setTitle] = useState(selectedNote?.title || '');
  const [priority, setPriority] = useState(
    selectedNote?.priority || ''
  );
  const [content, setContent] = useState(selectedNote?.content || '');

  // Update local state when selectedNote changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setPriority(selectedNote.priority || '');
      setContent(selectedNote.content || '');
    }
  }, [selectedNote]);

  const handleBack = () => {
    navigate('/notes');
  };

  const handleTitleBlur = () => {
    if (selectedNote && title !== selectedNote.title) {
      updateNote(selectedNote.id, 'title', title);
    }
  };

  const handlePriorityBlur = () => {
    if (selectedNote && priority !== selectedNote.priority) {
      console.log('Calling onUpdateNote for priority');
      updateNote(selectedNote.id, 'priority', priority);
    }
  };

  const handleContentBlur = () => {
    if (selectedNote && content !== selectedNote.content) {
      updateNote(selectedNote.id, 'content', content);
    }
  };

  //note error 404
  if (!selectedNote) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-accent">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-3 p-1"
            >
              <ArrowLeft
                size={20}
                className="text-base-content"
              />
            </button>
            <h1 className="text-xl font-bold text-base-content">
              Note Not Found
            </h1>
          </div>
          <span className="text-sm text-base-content/60">
            {<ThemeToggle />}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-base-content/60">404: Note not found</p>
        </div>
      </div>
    );
  }

  //mobile editor layout
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <SavedToast
        showSaved={showSaved}
        isMobile={true}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-accent">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-3 p-1"
          >
            <ArrowLeft
              size={20}
              className="text-base-content"
            />
          </button>
          <h1 className="text-xl font-bold text-base-content">
            Note 1
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {<ThemeToggle />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-2">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Your title here"
            className="input input-bordered w-full input-secondary"
            autoFocus
          />
        </div>

        {/* Priority Dropdown */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium text-lg">
              Priority
            </span>
          </div>
          <select
            className="select select-bordered w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            onBlur={handlePriorityBlur}
          >
            <option
              disabled
              value=""
            >
              Set Priority
            </option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="label"></div>
        </label>

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-2">
            Note
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleContentBlur}
            placeholder="Your content here"
            rows={10}
            className="textarea textarea-bordered w-full resize-none rounded-lg textarea-accent flex-1 min-h-0 mb-5"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteEditPage;
