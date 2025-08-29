import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { NotesProvider, useNotes } from './context/NotesContext';
import { UsersProvider, useUsers } from './context/UsersContext';
import { ThemeProvider } from './context/ThemeContext';
import Mobile_NotesListPage from './pages/MobileNotesListPage';
import Mobile_NotesEditPage from './pages/MobileMobileNoteEditPage';
import DesktopLayout from './pages/DesktopLayout';

//route component
function AppRoutes() {
  // context plater
  const {
    notes,
    addNote,
    selectedNoteId,
    showSaved,
    updateNote,
    isMobile,
  } = useNotes();

  const { users, addUsers, SelectedUserId } = useUsers();

  //mobile routes
  if (isMobile) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Mobile_NotesListPage
              notes={notes}
              onAddNote={addNote}
            />
          }
        />
        <Route
          path="/note/:id"
          element={
            <Mobile_NotesEditPage
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
      <UsersProvider>
        <NotesProvider>
          <Toaster />
          <AppRoutes />
        </NotesProvider>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;
