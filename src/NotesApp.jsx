import { useEffect, useState } from 'react';
import SideMenu from './components/SideMenu';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [showEditor, setShowEditor] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-indigo-600 text-center">
          Notes App
        </h1>
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-indigo-700 m-6">
            Tailwind CSS is working! 🎉
          </p>
        </div>
        <SideMenu />
      </div>
    </>
  );
}

export default NotesApp;
