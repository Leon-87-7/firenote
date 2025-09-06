import { User } from 'phosphor-react';
import UserModal from './DesktopUserModal';
import { useState } from 'react';
import { useUsers } from '../context/UsersContext';

function UserUI() {
  const { users, SelectedUserId } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedUserName, setSelectedUserName] =
  //   useState('user name');

  const currentUser = users.find(
    (user) => user.id === SelectedUserId
  );
  const selectedUserName = currentUser
    ? currentUser.name
    : 'No User Selected';

  // const handleUserSelect = (UserName) => {
  //   setSelectedUserName(UserName);
  //   setIsModalOpen(false);
  // };
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
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onUserSelect={handleUserSelect}
        />
      )}
    </div>
  );
}

export default UserUI;
