import Logo from './components/Logo';
import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Logo />
    </>
  );
}

export default App;
