import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import NotesApp from './NotesApp.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesApp />
  </StrictMode>
);
