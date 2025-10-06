import { useEffect, useState } from 'react';
import { getOnlineUsers, listenForUpdates } from '../utils/chat';

const UserList = () => {
  const [users, setUsers] = useState(getOnlineUsers());

  useEffect(() => {
    const unsubscribe = listenForUpdates((data) => {
      if (data.type === 'userJoined' || data.type === 'userLeft') {
        setUsers(getOnlineUsers());
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="card w-64 h-96 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-secondary-500 to-accent bg-clip-text text-transparent">
        Online Users ({users.length})
      </h3>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-secondary-50 to-primary-50 hover:from-secondary-100 hover:to-primary-100 transition-all duration-300"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow"></div>
            <span className="font-medium text-gray-800">{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
