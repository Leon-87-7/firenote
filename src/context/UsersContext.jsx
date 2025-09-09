import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { db } from '../../firebase-config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [SelectedUserId, setSelectedUserId] = useState(() => {
    return localStorage.getItem('selectedUserId') || null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users
  useEffect(() => {
    loadUsersFromFirebase();
  }, []);

  // Save selected user to LS
  useEffect(() => {
    if (SelectedUserId) {
      localStorage.setItem('selectedUserId', SelectedUserId);
    }
  }, [SelectedUserId]);

  const loadUsersFromFirebase = async () => {
    try {
      setLoading(true);
      setError(null);

      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const firebaseUsers = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        firebaseUsers.push({
          id: docSnapshot.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : data.createdAt,
        });
      });
      setUsers(firebaseUsers);
    } catch (error) {
      console.error('Error loading users from firebase: ', error);
      setError('Failed to load users');

      //a fallback to local storage
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        setUsers(parsedUsers);
      }
    } finally {
      setLoading(false);
    }
  };

  //backup save func to LS
  const saveUsersToLocalStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  //create user
  const addUser = async (name = '') => {
    try {
      const newUser = {
        name: name,
        createdAt: new Date(),
      };

      const userRef = await addDoc(collection(db, 'users'), newUser);

      const userWithID = {
        id: userRef.id,
        ...newUser,
        createdAt: newUser.createdAt.toISOString(),
      };

      setUsers((prevUsers) => {
        const updatedUsers = [userWithID, ...prevUsers];
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
      });

      setSelectedUserId(userRef.id);

      return userWithID;
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      setError('Failed to create user');
      return null;
    }
  };

  const updateUser = async (userId, name) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        name: name,
        updatedAt: new Date(),
      });

      // Use functional update to ensure we have the latest state
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === userId
            ? { ...user, name, updatedAt: new Date().toISOString() }
            : user
        );
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error updating user: ', error);
      setError('Failed to update user');
      return false; //providing clear feedback
    }
  };
  //provider values/props
  const value = {
    users,
    addUser,
    updateUser,
    SelectedUserId,
    setSelectedUserId,
    loading,
    error,
  };

  //provider wrapper
  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

//custom hook of the userContext
export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
