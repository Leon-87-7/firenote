function AddBtn({ onAddNote }) {
  return (
    <>
      <button
        className="btn bg-gradient-to-bl from-accent to-secondary text-yellow-50 
        hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-base-300` dark:focus:ring-base-300 font-medium
        capitalize w-32 ml-auto mr-6 my-6"
        onClick={onAddNote}
      >
        <img
          className="plus-svg"
          src="/src/assets/plus.svg"
          alt=""
        />
        add Note
      </button>
    </>
  );
}

export default AddBtn;
