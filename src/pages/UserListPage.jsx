import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUsers } from '../context/UsersContext';
import UserModal from '../components/UserModal';
import MobileLogo from '../components/MobileLogo';
import { CaretRight } from 'phosphor-react';

function UserListPage() {
  const { users, setSelectedUserId } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    navigate('/');
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUserCreated = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <MobileLogo />
      <div className="border-b border-accent" />

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Add User Button */}
        <button
          onClick={handleAddUser}
          className="btn bg-gradient-to-bl from-accent to-secondary text-accent-content 
        hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-base-300` dark:focus:ring-base-300 font-medium
        capitalize w-full "
        >
          + Add User
        </button>

        {/* Users List */}
        <h4 className="text-center text-primary-content font-medium capitalize w-full my-4">
          Your users list
        </h4>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors"
              onClick={() => handleUserSelect(user.id)}
            >
              <span className="ml-2 text-lg text-base-content font-medium">
                {user.name}
              </span>
              <span className="text-base-content/60">
                <CaretRight
                  size={20}
                  weight="bold"
                />
              </span>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-8 text-base-content/60">
            <p>No users yet. Add your first user to get started!</p>
          </div>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUserSelect={handleUserCreated}
      />
    </div>
  );
}

export default UserListPage;
