import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import { NotesProvider, useNotes } from './context/NotesContext';
import NotesListPage from './pages/NotesListPage';
import NoteEditPage from './pages/NoteEditPage';
import DesktopLayout from './pages/DesktopLayout';

function AppRoutes() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const { notes, selectedNoteId, showSaved, addNote, updateNote } = useNotes();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <Routes>
        <Route 
          path="/" 
          element={
            <NotesListPage 
              notes={notes} 
              onAddNote={addNote} 
            />
          } 
        />
        <Route 
          path="/note/:id" 
          element={
            <NoteEditPage 
              notes={notes} 
              onUpdateNote={updateNote}
              showSaved={showSaved}
            />
          } 
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <DesktopLayout 
            notes={notes}
            selectedNoteId={selectedNoteId}
            onAddNote={addNote}
            onUpdateNote={updateNote}
            showSaved={showSaved}
          />
        } 
      />
      <Route 
        path="/note/:id" 
        element={
          <DesktopLayout 
            notes={notes}
            selectedNoteId={selectedNoteId}
            onAddNote={addNote}
            onUpdateNote={updateNote}
            showSaved={showSaved}
          />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <NotesProvider>
      <AppRoutes />
    </NotesProvider>
  );
}

export default App;