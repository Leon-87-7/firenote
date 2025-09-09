import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import SavedToast from './SavedToast';

function NoteEditor({ note, onUpdateNote, showSaved, isMobile }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setPriority(note.priority || '');
      setContent(note.content || '');
    }
  }, [note]);

  const getShadowColor = (currentTheme) => {
    return currentTheme === 'cordovanChalkTheme'
      ? `rgba(41, 37, 36, 0.3)`
      : `rgba(240, 239, 205, 0.2)`;
  };

  const shadowBoxStyle = {
    boxShadow: `0px 0px 11px -3px ${getShadowColor(theme)}`,
  };

  const handleTitleBlur = async () => {
    if (note && title !== note.title) {
      await onUpdateNote(note.id, 'title', title);
    }
  };

  const handlePriorityBlur = async () => {
    if (note && priority !== note.priority) {
      await onUpdateNote(note.id, 'priority', priority);
    }
  };

  const handleContentBlur = async () => {
    if (note && content !== note.content) {
      await onUpdateNote(note.id, 'content', content);
    }
  };

  return (
    <>
      <SavedToast
        showSaved={showSaved}
        isMobile={false}
      />
      <div
        className="h-full flex flex-col mx-8 mt-14 mb-4 p-8 rounded-3xl"
        style={shadowBoxStyle}
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

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium text-lg">
              Priority
            </span>
          </div>
          <select
            className="select select-bordered w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            onBlur={handlePriorityBlur}
          >
            <option
              disabled
              value=""
            >
              Set Priority
            </option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="label"></div>
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

//***********************/
// if (isMobile) {
//   // Mobile screen
//   return (
//     <>
//       <SavedToast
//         showSaved={showSaved}
//         isMobile={true}
//       />
//       <div className="h-full flex flex-col pl-4 pr-6 max-md:shadow-none min-h-0">
//         <label className="form-control">
//           <div className="label">
//             <span className="label-text font-medium text-lg">
//               Title:
//             </span>
//           </div>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             onBlur={handleTitleBlur}
//             placeholder="Your title here"
//             className="input input-bordered w-full input-secondary "
//           />
//         </label>

//         <label className="form-control w-full">
//           <div className="label">
//             <span className="label-text font-medium text-lg">
//               Priority
//             </span>
//           </div>
//           <select
//             className="select select-bordered w-full"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             onBlur={handlePriorityBlur}
//           >
//             <option
//               disabled
//               value=""
//             >
//               Set Priority
//             </option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//           <div className="label"></div>
//         </label>

//         <label className="form-control flex-1 flex flex-col mt-2 min-h-0">
//           <div className="label">
//             <span className="label-text font-medium text-lg">
//               Note:
//             </span>
//           </div>
//           <textarea
//             className="textarea textarea-bordered w-full resize-none rounded-lg textarea-accent flex-1 min-h-0 mb-5"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             onBlur={handleContentBlur}
//             placeholder="Your content here"
//           ></textarea>
//         </label>
//       </div>
//     </>
//   );
// }
