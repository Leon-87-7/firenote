import '../../public/note.svg';
import { ArrowFatLineLeft } from 'phosphor-react';

export default function Logo({ onBack }) {
  return (
    <div className="flex m-3">
      {/* {onBack && (
        <button
          // className="btn size-4 text-primary-content text-3xl"
          className="bg-base-300 hover:bg-base-200 px-4 border-b-4 border-accent hover:border-secondary rounded"
          onClick={onBack}
        >
          <ArrowFatLineLeft
            size={18}
            weight="fill"
          />
        </button>
      )} */}
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
