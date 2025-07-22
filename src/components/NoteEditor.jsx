import '../styles/components/NoteEditor.css';
const NoteEditor = () => {
  return (
    <div className="Editor-wrapper">
      <span className="save-indicator">Saved!</span>
      <div>
        <span>Title</span>
        <input
          className="editor-fields"
          type="text"
          placeholder="Your title here"
        />
      </div>
      <div>
        <span>Note</span>
        <textarea
          className="editor-fields"
          placeholder="You content here"
          spellCheck="true"
          id=""
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
