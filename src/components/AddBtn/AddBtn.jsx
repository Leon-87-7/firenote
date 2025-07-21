import './AddBtn.css';

export default function AddBtn() {
  return (
    <button className="Add-btn">
      <img
        className="plus-svg"
        src="src\assets\plus.svg"
        alt=""
      />
      <span className="text">Add Note</span>
    </button>
  );
}
