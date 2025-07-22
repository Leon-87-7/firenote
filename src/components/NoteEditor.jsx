import '../styles/components/NoteEditor.css';
const NoteEditor = () => {
  return (
    <div className="Editor-wrapper">
      <div className="save-indicator">Saved!</div>
      <div>
        Title
        <input
          type="text"
          placeholder="Your title here"
        />
      </div>
      <div>
        Note
        <textarea
          placeholder="You content here"
          name=""
          id=""
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
