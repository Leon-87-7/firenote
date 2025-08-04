import { Sun, Moon } from 'phosphor-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
