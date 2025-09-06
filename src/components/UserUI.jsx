import { User } from 'phosphor-react';
import UserModal from './UserModal';
import { useState } from 'react';

function UserUI() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] =
    useState('user name');

  const handleUserSelect = (UserName) => {
    setSelectedUserName(UserName);
    setIsModalOpen(false);
  };
  return (
    <div className="inline-flex my-3 absolute right-8">
      <button
        className="btn btn-sm btn-secondary text-accent-content aspect-video"
        onClick={() => {
          setIsModalOpen(true);
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

      {isModalOpen && (
        <UserModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserSelect={handleUserSelect}
        />
      )}
    </div>
  );
}

export default UserUI;
