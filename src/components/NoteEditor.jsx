import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

function NoteEditor({ note, onUpdateNote, showSaved, isMobile }) {
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

  useEffect(() => {
    if (showSaved) {
      toast.success('saved!', {
        position: 'top-right',
        style: {
          border: '1px solid #713200',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 'bold',
          padding: '8px',
          color: '#8c4853',
        },
        iconTheme: {
          primary: '#16a34a',
          secondary: '#FFFAEE',
        },
      });
    }
  }, [showSaved]);

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
    <>
      <div className="h-full flex flex-col mx-8 my-4 p-8 rounded-3xl max-md:shadow-none shadow-md shadow-primary-content">
        {!isMobile && <ThemeToggle />}
        <label className="form-control">
          <div className="label">
            <span className="label-text font-medium text-lg">
              Title:
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Your title here"
            className="input input-bordered w-full max-md:input-secondary "
          />
        </label>

        <label className="form-control flex-1 flex flex-col">
          <div className="label">
            <span className="label-text font-medium text-lg">
              Note:
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full flex-1 resize-none rounded-lg max-md:textarea-accent"
            style={{ minHeight: '34rem' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleContentBlur}
            placeholder="Your content here"
          ></textarea>
        </label>
      </div>
    </>
  );
}

export default NoteEditor;
