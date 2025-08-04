import { Plus } from 'phosphor-react';
function AddBtn({ onAddNote }) {
  return (
    <>
      <button
        className="btn bg-gradient-to-bl from-accent to-secondary text-accent-content 
        hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-base-300` dark:focus:ring-base-300 font-medium
        capitalize w-32 ml-auto mr-6 my-6"
        onClick={onAddNote}
      >
        <Plus
          size={20}
          weight="bold"
        />
        add Note
      </button>
    </>
  );
}

export default AddBtn;
