import { Route, Routes } from 'react-router';

import NotesApp from './NotesApp.jsx';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<NotesApp />}
      />
    </Routes>
  );
}

export default App;
