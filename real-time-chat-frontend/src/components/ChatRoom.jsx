import { useState, useEffect, useRef } from 'react';
import { getCurrentUser, logoutUser } from '../utils/auth';
import { getMessages, addMessage, addOnlineUser, removeOnlineUser, listenForUpdates } from '../utils/chat';
import Message from './Message';
import UserList from './UserList';

const ChatRoom = ({ onLogout }) => {
  const [messages, setMessages] = useState(getMessages());
  const [newMessage, setNewMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    addOnlineUser(currentUser.username);
    const unsubscribe = listenForUpdates((data) => {
      if (data.type === 'newMessage') {
        setMessages(prev => [...prev, data.message]);
      } else if (data.type === 'userJoined') {
        addNotification(`${data.username} joined the chat`);
      } else if (data.type === 'userLeft') {
        addNotification(`${data.username} left the chat`);
      }
    });

    return () => {
      removeOnlineUser(currentUser.username);
      unsubscribe();
    };
  }, [currentUser.username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addNotification = (text) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      addMessage({ username: currentUser.username, text: newMessage.trim() });
      setNewMessage('');
    }
  };

  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-light to-secondary-50">
      {/* Header */}
      <header className="bg-white bg-opacity-90 backdrop-blur-xs shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent">
            Real-Time Chat
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {currentUser.username}!</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-accent text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up"
          >
            {notif.text}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full p-4 space-x-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col card">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <Message
                key={msg.id}
                message={msg}
                isOwn={msg.username === currentUser.username}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="input-field flex-1"
                maxLength={500}
              />
              <button type="submit" className="btn-primary px-6">
                Send
              </button>
            </div>
          </form>
        </div>

        {/* User List */}
        <UserList />
      </div>
    </div>
  );
};

export default ChatRoom;
