import SavedIndicator from './SavedIndicator';

export default function Logo({ onBack, showSaved }) {
  return (
    <div className="flex m-3">
      {onBack && (
        
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>


        <button
          className="btn size-4 text-primary-content text-3xl"
          onClick={onBack}
        >
          ←
        </button>
      )}
      <img
        src="./note.svg"
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
