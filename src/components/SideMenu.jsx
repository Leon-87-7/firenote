import AddBtn from './AddBtn';
// import MobileLogo from './MobileLogo';
import DeskLogo from './DeskLogo';
import NotesList from './DeskNotesList';

function SideMenu({
  notes,
  selectedNoteId,
  onAddNote,
  onSelectNote,
  isMobile,
}) {
  return (
    <div className="h-screen relative flex flex-col border-r border-r-primary-content/20 shadow-[4px_0_6px_2px_rgba(0,0,0,0.1)]">
      {/* {isMobile ? <MobileLogo /> : <DeskLogo />} */}
      <DeskLogo />
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
