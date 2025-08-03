import { useState, useEffect } from 'react';

function NoteEditor({ note, onUpdateNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleTitleBlur = () => {
    if (note && title !== note.title) {
      onUpdateNote(note.id, 'title', title);
    }
  };

  const handleContentBlur = () => {
    if (note && content !== note.content) {
      onUpdateNote(note.id, 'content', content);
    }
  };

  return (
    <div className="note-editor">
      <div className="card">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title:</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Your title here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Note:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 resize-none rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleContentBlur}
            placeholder="Your content here"
          ></textarea>
        </label>
      </div>
    </div>
  );
}

export default NoteEditor;
