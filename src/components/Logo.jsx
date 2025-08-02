import SavedIndicator from './SavedIndicator';
import '../../public/note.svg';

export default function Logo({ onBack, showSaved }) {
  return (
    <div className="flex m-3">
      {onBack && (
        <button
          className="btn size-4 text-primary-content text-3xl"
          onClick={onBack}
        >
          ←
        </button>
      )}
      <img
        src="/note.svg"
        alt="logo"
        className="size-6 m-2"
      />
      <span className="text-4xl font-medium text-primary-content">
        My Notes App
      </span>
      {showSaved && <SavedIndicator />}
    </div>
  );
}
