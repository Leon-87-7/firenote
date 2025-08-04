import { useState, useEffect } from 'react';
import { Sun, Moon } from 'phosphor-react';

function ThemeToggle() {
  const [theme, setTheme] = useState('cordovanChalkTheme');

  useEffect(() => {
    const currentTheme =
      localStorage.getItem('theme') || 'cordovanChalkTheme';
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === 'cordovanChalkTheme'
        ? 'brownPinkRoseTheme'
        : 'cordovanChalkTheme';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      className="flex gap-1"
      style={{ marginRight: '0.7rem' }}
    >
      <Sun
        size={15}
        className="my-1"
      />
      <input
        type="checkbox"
        value={theme}
        checked={theme === 'brownPinkRoseTheme'}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />
      <Moon
        size={15}
        className="my-1"
      />
    </button>
  );
}

export default ThemeToggle;
