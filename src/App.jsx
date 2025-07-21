import Logo from './components/Logo/Logo';
import { useState } from 'react';

import './App.css';
import SideMenu from './components/SideMenu/SideMenu';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SideMenu />
    </>
  );
}

export default App;
