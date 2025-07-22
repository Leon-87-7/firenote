import '../styles/components/DarkLightToggle.css';

export default function DarkLightToggle({ toggleTheme, darkMode }) {
  return (
    <button
      className="toggle-btn"
      onChange={toggleTheme}
    >
      {darkMode ? '☀️' : '🌑'}
    </button>
  );
}
