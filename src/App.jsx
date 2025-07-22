import Logo from './components/Logo/Logo';
import { useState } from 'react';

import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import NoteEditor from './components/NoteEditor/NoteEditor';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App-wrapper">
      <SideMenu />
      <NoteEditor />
    </div>
  );
}

export default App;
