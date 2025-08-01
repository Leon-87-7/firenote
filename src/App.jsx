import { useState } from 'react';

import DarkLightToggle from './components/DarkLightToggle';
import SideMenu from './components/SideMenu';
import NoteEditor from './components/NoteEditor';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    );
  };
  return (
    <>
      <div className="App-wrapper">
        <DarkLightToggle
          toggleTheme={toggleTheme}
          darkMode={darkMode}
        />
        <SideMenu />
        <NoteEditor />
      </div>
    </>
  );
}

export default App;
