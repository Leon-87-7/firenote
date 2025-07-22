import '../styles/components/Logo.css';

export default function Logo() {
  return (
    <div className="logo">
      <img
        src="./note.svg"
        alt="logo"
      />
      <span>My Notes App</span>
    </div>
  );
}
