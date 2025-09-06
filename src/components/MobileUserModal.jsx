import { useState, useEffect } from 'react';
import { useUsers } from '../context/UsersContext';

function UserModal({ isOpen, onClose, onUserSelect }) {
  const { addUser, setSelectedUserId } = useUsers();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isAddingUser) {
          setIsAddingUser(false);
          setNewUserName('');
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () =>
        document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, isAddingUser]);

  const handleAddUserSave = async () => {
    if (newUserName.trim()) {
      const newUser = await addUser(newUserName.trim());
      if (newUser) {
        setSelectedUserId(newUser.id);
        // Pass the new user name to the parent component
        if (onUserSelect) {
          onUserSelect(newUserName.trim());
        }
      }
    }
    setIsAddingUser(false);
    setNewUserName('');
    onClose();
  };

  const handleAddUserCancel = () => {
    setIsAddingUser(false);
    setNewUserName('');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 rounded-lg p-6 w-80">
        {
          <>
            <h2 className="capitalize text-primary-content text-lg font-semibold mb-4 text-center">
              Add User
            </h2>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="User name here..."
              className="input input-accent input-bordered w-full mb-4"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddUserSave();
                if (e.key === 'Escape') handleAddUserCancel();
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddUserCancel}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUserSave}
                className="btn bg-gradient-to-bl from-accent to-secondary text-accent-content 
        hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-base-300` dark:focus:ring-base-300 font-medium
        capitalize w-24"
                disabled={!newUserName.trim()}
              >
                Add
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default UserModal;
