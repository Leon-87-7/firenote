import { User } from 'phosphor-react';

function UserUI() {
  return (
    <div className="inline-flex my-3 absolute right-8">
      <button className="btn btn-sm btn-secondary text-accent-content aspect-video">
        Switch
      </button>
      <User
        size={32}
        className="mx-2 text-secondary"
      />
      <div className="text-lg italic font-mono">user name</div>
    </div>
  );
}

export default UserUI;
