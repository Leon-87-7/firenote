import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { db } from '../../firebase-config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotesFromFirebase = async () => {
    try {
      setLoading(true);
      setError(null);

      const notesCollection = collection(db, 'notes');
      const q = query(notesCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const firebaseNotes = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        firebaseNotes.push({
          id: docSnapshot.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : data.createdAt,
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt,
        });
      });
      setNotes(firebaseNotes);
    } catch (error) {
      console.error('Error loading notes from firebase: ', error);
      setError('Failed to load notes');

      //a fallback to local storage
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      }
    } finally {
      setLoading(false);
    }
  };
  // Load notes
  useEffect(() => {
    loadNotesFromFirebase();
  }, []);

  // resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //backup save func to LS
  const saveNotesToLocalStorage = (updatedNotesToLocalStorage) => {
    localStorage.setItem(
      'notes',
      JSON.stringify(updatedNotesToLocalStorage)
    );
  };

  //create note -> now it's async function
  const addNote = async () => {
    try {
      const newNote = {
        title: '',
        priority: '',
        content: '',
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'notes'), newNote);

      const noteWithID = {
        id: docRef.id,
        ...newNote,
        createdAt: newNote.createdAt.toISOString(),
      };

      const updatedNotesToLocalStorage = [noteWithID, ...notes];
      setNotes(updatedNotesToLocalStorage);
      setSelectedNoteId(docRef.id);
      saveNotesToLocalStorage(updatedNotesToLocalStorage);

      return noteWithID;
    } catch (error) {
      console.error('Error adding note to Firestore:', error);
      setError('Failed to create note');

      const newNote = {
        id: Date.now().toString(),
        title: '',
        priority: '',
        content: '',
        createdAt: new Date().toISOString(),
      };

      const updatedNotesToLocalStorage = [newNote, ...notes];
      setNotes(updatedNotesToLocalStorage);
      setSelectedNoteId(newNote.id);
      saveNotesToLocalStorage(updatedNotesToLocalStorage);

      return newNote;
    }
  };

  //update note
  const updateNoteToFirebase = async (id, field, value) => {
    try {
      //update in firebase
      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, {
        [field]: value,
        updatedAt: new Date(),
      });
      //update to LS
      const updatedNotesToLocalStorage = notes.map((note) =>
        note.id === id
          ? {
              ...note,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      setNotes(updatedNotesToLocalStorage);
      saveNotesToLocalStorage(updatedNotesToLocalStorage);

      // Show saved indicator
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    } catch (error) {
      console.error('Error updating note in Firestore:', error);
      setError('Failed to update note');

      //update to LS
      const updatedNotesToLocalStorage = notes.map((note) =>
        note.id === id
          ? {
              ...note,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      setNotes(updatedNotesToLocalStorage);
      saveNotesToLocalStorage(updatedNotesToLocalStorage);

      // Show saved indicator
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }
  };

  //provider values/props
  const value = {
    notes,
    selectedNoteId,
    showSaved,
    addNote,
    updateNote: updateNoteToFirebase,
    setSelectedNoteId,
    isMobile,
    loading,
    error,
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
