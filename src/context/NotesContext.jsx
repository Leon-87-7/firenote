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
  where,
} from 'firebase/firestore';

import { useUsers } from './UsersContext';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { SelectedUserId } = useUsers();

  // Load notes: show note when there is a user id selected, else show empty notes array
  useEffect(() => {
    if (SelectedUserId) {
      loadNotesFromFirebase();
    } else {
      setNotes([]);
    }
  }, [SelectedUserId]);

  // resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadNotesFromFirebase = async () => {
    try {
      setLoading(true);
      setError(null);

      const notesCollection = collection(db, 'notes');

      const q = SelectedUserId
        ? query(
            notesCollection,
            where('userId', '==', SelectedUserId), // in english: where user id is the selected user id, make the query
            orderBy('createdAt', 'desc')
          )
        : query(notesCollection, orderBy('createdAt', 'desc'));
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

  //backup save func to LS
  const saveNotesToLocalStorage = (toLocalStorageNotes) => {
    localStorage.setItem(
      'notes',
      JSON.stringify(toLocalStorageNotes)
    );
  };

  //create note -> now it's async function
  const addNote = async () => {
    if (!SelectedUserId) {
      setError('First select a user, please 🙏');
      return;
    }

    try {
      const newNote = {
        title: '',
        priority: '',
        content: '',
        userId: SelectedUserId,
        createdAt: new Date(),
      };

      const noteRef = await addDoc(collection(db, 'notes'), newNote);

      const noteWithID = {
        id: noteRef.id,
        ...newNote,
        createdAt: newNote.createdAt.toISOString(),
      };

      const toLocalStorageNotes = [noteWithID, ...notes];
      setNotes(toLocalStorageNotes);
      setSelectedNoteId(noteRef.id);
      saveNotesToLocalStorage(toLocalStorageNotes);

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

      const toLocalStorageNotes = [newNote, ...notes];
      setNotes(toLocalStorageNotes);
      setSelectedNoteId(newNote.id);
      saveNotesToLocalStorage(toLocalStorageNotes);

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
      const toLocalStorageNotes = notes.map((note) =>
        note.id === id
          ? {
              ...note,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      setNotes(toLocalStorageNotes);
      saveNotesToLocalStorage(toLocalStorageNotes);

      // Show saved indicator
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    } catch (error) {
      console.error('Error updating note in Firestore:', error);
      setError('Failed to update note');

      //update to LS
      const toLocalStorageNotes = notes.map((note) =>
        note.id === id
          ? {
              ...note,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      setNotes(toLocalStorageNotes);
      saveNotesToLocalStorage(toLocalStorageNotes);

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
