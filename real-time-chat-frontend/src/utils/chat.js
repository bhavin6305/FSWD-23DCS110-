// Chat utilities using localStorage and BroadcastChannel for "real-time"

const MESSAGES_KEY = 'chatMessages';
const USERS_KEY = 'onlineUsers';

export const getMessages = () => {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
};

export const addMessage = (message) => {
  const messages = getMessages();
  messages.push({ ...message, id: Date.now(), timestamp: new Date().toISOString() });
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  // Broadcast to other tabs
  const bc = new BroadcastChannel('chat');
  bc.postMessage({ type: 'newMessage', message: messages[messages.length - 1] });
  bc.close();
};

export const getOnlineUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const addOnlineUser = (username) => {
  const users = getOnlineUsers();
  if (!users.includes(username)) {
    users.push(username);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const bc = new BroadcastChannel('chat');
    bc.postMessage({ type: 'userJoined', username });
    bc.close();
  }
};

export const removeOnlineUser = (username) => {
  const users = getOnlineUsers();
  const index = users.indexOf(username);
  if (index > -1) {
    users.splice(index, 1);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const bc = new BroadcastChannel('chat');
    bc.postMessage({ type: 'userLeft', username });
    bc.close();
  }
};

export const listenForUpdates = (callback) => {
  const bc = new BroadcastChannel('chat');
  bc.onmessage = (event) => {
    callback(event.data);
  };
  return () => bc.close();
};
