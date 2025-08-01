import AddNoteBtn from './AddNoteBtn';
import NotesList from './NotesList';

function SideMenu({
  notes,
  selectedNoteId,
  onAddNote,
  onSelectNote,
  isMobile,
}) {
  return (
    <div className="bg-slate-800 text-orange-300">
      <div className="">
        <h1>My Notes App</h1>
        <AddNoteBtn
          onClick={onAddNote}
          className=""
        />
      </div>
      <NotesList
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={onSelectNote}
        isMobile={isMobile}
      />
    </div>
  );
}

export default SideMenu;
