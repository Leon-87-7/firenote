import AddBtn from './AddBtn';
import Logo from './Logo';
import NotesList from './NotesList';

function SideMenu({
  notes,
  selectedNoteId,
  onAddNote,
  onSelectNote,
  isMobile,
}) {
  return (
    <div className="side-menu flex flex-col">
      {!isMobile && <Logo />}

      <div className="flex flex-col ">
        <AddBtn onAddNote={onAddNote} />
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
