import './Logo.css';

export default function Logo() {
  return (
    <div className="logo">
      <img
        style={{
          height: '1.7rem',
          marginRight: '0.3rem',
        }}
        src="./note.svg"
        alt="logo"
      />
      <span
        style={{
          fontSize: '1.5rem',
        }}
      >
        My Notes App
      </span>
    </div>
  );
}
