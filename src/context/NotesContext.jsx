import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showSaved, setShowSaved] = useState(false);

  // Load notes
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  // resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //save helper func
  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  //create note
  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      priority: '',
      content: '',
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
    saveNotesToLocalStorage(updatedNotes);

    return newNote;
  };

  //update note
  const updateNote = (id, field, value) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);

    // Show saved indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  //provider values/props
  const value = {
    notes,
    selectedNoteId,
    showSaved,
    addNote,
    updateNote,
    setSelectedNoteId,
    isMobile,
  };

  //provider wrapper
  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

//custom hook of the noteContext
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
