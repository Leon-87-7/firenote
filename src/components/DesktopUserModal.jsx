import { useState, useEffect } from 'react';
import { User, Plus, X } from 'phosphor-react';
import { useUsers } from '../context/UsersContext';

function UserModal({ isOpen, onClose }) {
  const { users, addUser, SelectedUserId, setSelectedUserId } =
    useUsers();
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

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    onClose();
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);
  };

  const handleAddUserSave = async () => {
    if (newUserName.trim()) {
      const newUser = await addUser(newUserName.trim());
      if (newUser) {
        setSelectedUserId(newUser.id);
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

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isAddingUser) {
        setIsAddingUser(false);
        setNewUserName('');
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 rounded-lg p-6 w-80">
        {isAddingUser ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Switch User</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X
                  size={16}
                  weight="bold"
                />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 rounded cursor-pointer
  transition-colors ${
    SelectedUserId === user.id
      ? 'bg-primary text-primary-content'
      : 'hover:bg-neutral/70'
  }`}
                  onClick={() => handleUserSelect(user.id)}
                >
                  <User
                    size={20}
                    className="mr-3"
                  />
                  <span>{user.name}</span>
                  {SelectedUserId === user.id && (
                    <span className="ml-auto text-sm font-bold">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddUserClick}
              className="btn btn-secondary btn-outline w-full"
            >
              <Plus size={16} />
              Add User
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserModal;
