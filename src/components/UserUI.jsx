import { User } from 'phosphor-react';
import UserModal from './UserModal';
import { useState } from 'react';

function UserUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] =
    useState('user name');

  const handleUserSelect = (UserName) => {
    setSelectedUserName(UserName);
    setIsOpen(false);
  };
  return (
    <div className="inline-flex my-3 absolute right-8">
      <button
        className="btn btn-sm btn-secondary text-accent-content aspect-video"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Switch
      </button>
      <User
        size={32}
        className="mx-2 text-secondary"
      />
      <div className="text-lg italic font-mono">
        {selectedUserName}
      </div>

      {isOpen && (
        <UserModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onUserSelect={handleUserSelect}
        />
      )}
    </div>
  );
}

export default UserUI;
