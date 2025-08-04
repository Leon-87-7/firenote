import AddBtn from './AddBtn';
import MobileLogo from './MobileLogo';
import DeskLogo from './DeskLogo';
import NotesList from './NotesList';

function SideMenu({
  notes,
  selectedNoteId,
  onAddNote,
  onSelectNote,
  isMobile,
}) {
  return (
    <div className="side-menu relative flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] h-screen">
      {isMobile ? <MobileLogo /> : <DeskLogo />}

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
