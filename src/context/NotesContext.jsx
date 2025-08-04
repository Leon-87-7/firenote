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

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    saveNotesToLocalStorage(updatedNotes);

    return newNote;
  };

  const updateNote = (id, field, value) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);

    // Show saved indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const value = {
    notes,
    selectedNoteId,
    showSaved,
    addNote,
    updateNote,
    setSelectedNoteId,
    isMobile,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
