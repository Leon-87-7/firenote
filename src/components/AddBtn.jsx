import './AddBtn.css';

export default function AddBtn() {
  return (
    <div className="Add-container">
      <button className="Add-btn">
        <img
          className="plus-svg"
          src="src\assets\plus.svg"
          alt=""
        />
        <span className="text">Add Note</span>
      </button>
    </div>
  );
}
