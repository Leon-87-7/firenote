import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { NotesProvider, useNotes } from './context/NotesContext';
import { ThemeProvider } from './context/ThemeContext';
import NotesListPage from './pages/NotesListPage';
import NoteEditPage from './pages/NoteEditPage';
import DesktopLayout from './pages/DesktopLayout';

//route component
function AppRoutes() {
  // context plater
  const {
    notes,
    selectedNoteId,
    showSaved,
    addNote,
    updateNote,
    isMobile,
  } = useNotes();

  //mobile routes
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

  //desktop routes
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

//main app
function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <Toaster />
        <AppRoutes />
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;
