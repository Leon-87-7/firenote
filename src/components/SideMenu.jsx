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
      {isMobile && <div className="border-t border-accent " />}

      <AddBtn onAddNote={onAddNote} />
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
