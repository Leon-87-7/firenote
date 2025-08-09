import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

function NoteEditor({ note, onUpdateNote, showSaved, isMobile }) {
  const { theme } = useTheme();
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

  const getThemeColor = (colorProp) => {
    const computedStyle = getComputedStyle(document.documentElement);
    const value = computedStyle.getPropertyValue(colorProp).trim();
    return value;
  };

  /*TODO refactor the colors:
  make a @theme{}
  https://tailwindcss.com/docs/theme */
  // const secondary = getThemeColor('--s');
  const accent = getThemeColor('--a');
  const neutral = getThemeColor('--n');
  const success = getThemeColor('--su');
  const warningContent = getThemeColor('--wac');

  const getShadowColor = (currentTheme) => {
    return currentTheme === 'cordovanChalkTheme'
      ? `rgba(41, 37, 36, 0.3)`
      : `rgba(240, 239, 205, 0.2)`;
  };

  const shadowBoxStyle = {
    boxShadow: `0px 0px 11px -3px ${getShadowColor(theme)}`,
  };

  const positionValue = isMobile ? 'top-center' : 'top-right';

  useEffect(() => {
    if (showSaved) {
      toast.success('saved!', {
        position: `${positionValue}`,
        style: {
          border: `1px solid oklch(${warningContent})`,
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 'bold',
          padding: '8px',
          color: `oklch(${accent})`,
          backgroundColor: `oklch(${neutral})`,
        },
        iconTheme: {
          primary: `oklch(${success})`,
          secondary: `oklch(${neutral})`,
        },
      });
    }
  }, [showSaved, accent, neutral, success, warningContent]);

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

  if (isMobile) {
    // Mobile screen
    return (
      <>
        <div className="h-full flex flex-col pl-4 pr-6 max-md:shadow-none min-h-0">
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
              className="input input-bordered w-full input-secondary "
            />
          </label>

          <label className="form-control flex-1 flex flex-col mt-2 min-h-0">
            <div className="label">
              <span className="label-text font-medium text-lg">
                Note:
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full resize-none rounded-lg textarea-accent flex-1 min-h-0 mb-5"
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

  return (
    // Desktop screen
    <>
      <div
        className="h-full flex flex-col mx-8 my-4 p-8 rounded-3xl"
        style={shadowBoxStyle}
        // shadow-md shadow-primary-content"
      >
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
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control flex-1 flex flex-col">
          <div className="label">
            <span className="label-text font-medium text-lg">
              Note:
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full flex-1 resize-none rounded-lg "
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
