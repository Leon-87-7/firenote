export default function Logo({}) {
  return (
    <>
      <img
        style={{
          height: '1.5rem',
          marginRight: '0.3rem',
        }}
        src="../public/note.svg"
        alt="logo"
      />
      <span
        style={{
          fontSize: '1.5rem',
        }}
      >
        My Notes App
      </span>
    </>
  );
}
