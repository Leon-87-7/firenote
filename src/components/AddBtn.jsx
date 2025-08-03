function AddBtn({ onAddNote }) {
  return (
    <button
      className="btn btn-accent capitalize w-32 ml-40 mt-4"
      onClick={onAddNote}
    >
      <img
        className="plus-svg"
        src="/src/assets/plus.svg"
        alt=""
      />
      add Note
    </button>
  );
}

export default AddBtn;
