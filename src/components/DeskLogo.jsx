import '../../src/note.svg';

export default function Logo({ onBack }) {
  return (
    <div className="flex m-3">
      <img
        src="/note.svg"
        alt="logo"
        className="size-9 m-2"
      />
      <span className="text-4xl font-medium text-primary-content pt-1">
        My Notes App
      </span>
    </div>
  );
}
