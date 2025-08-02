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

  if (!note) {
    return (
      <div className="note-editor empty">
        <p>Select a note to start editing</p>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          placeholder="Your title here"
          className="title-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Note</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleContentBlur}
          placeholder="Your content here"
          className="content-textarea"
          rows="15"
        />
      </div>
    </div>
  );
}

export default NoteEditor;
