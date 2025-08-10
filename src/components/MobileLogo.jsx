import '../../public/note.svg';
import { ArrowFatLineLeft } from 'phosphor-react';
import ThemeToggle from './ThemeToggle';

export default function Logo({ onBack }) {
  return (
    <div className="flex items-center justify-between m-3">
      <div className="flex items-center">
        {onBack && (
          <button
            className="bg-base-300 hover:bg-base-200 px-3 py-2 border-b-4 border-accent hover:border-secondary rounded-tr rounded-tl-lg  mr-2"
            onClick={onBack}
          >
            <ArrowFatLineLeft
              size={18}
              weight="fill"
            />
          </button>
        )}
        <img
          src="/note.svg"
          alt="logo"
          className="size-9 m-2"
        />
        <span className="text-4xl font-medium text-primary-content pt-1">
          My Notes App
        </span>
      </div>
      <ThemeToggle />
    </div>
  );
}
