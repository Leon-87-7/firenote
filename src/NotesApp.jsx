import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import SideMenu from './components/SideMenu';
import NoteEditor from './components/NoteEditor';
import SavedIndicator from './components/SavedIndicator';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [showEditor, setShowEditor] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
    saveNotesToStorage(updatedNotes);

    if (isMobile) {
      setShowEditor(true);
    }
  };

  const updateNote = (id, field, value) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);

    // Show saved indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const selectNote = (id) => {
    setSelectedNoteId(id);
    if (isMobile) {
      setShowEditor(true);
    }
  };

  const backToList = () => {
    setShowEditor(false);
    setSelectedNoteId(null);
  };

  const selectedNote = notes.find(
    (note) => note.id === selectedNoteId
  );

  if (isMobile) {
    return (
      <div className="notes-app mobile">
        {!showEditor ? (
          <div className="mobile-list">
            <Logo />
            <SideMenu
              notes={notes}
              onAddNote={addNote}
              onSelectNote={selectNote}
              isMobile={true}
            />
          </div>
        ) : (
          <div className="mobile-editor">
            <Logo
              onBack={backToList}
              showSaved={showSaved}
            />
            <NoteEditor
              note={selectedNote}
              onUpdateNote={updateNote}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="notes-app desktop">
        <SideMenu
          notes={notes}
          selectedNoteId={selectedNoteId}
          onAddNote={addNote}
          onSelectNote={selectNote}
          isMobile={isMobile}
        />
        <div className="main-content">
          {showSaved && <SavedIndicator />}
          <NoteEditor
            note={selectedNote}
            onUpdateNote={updateNote}
          />
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
