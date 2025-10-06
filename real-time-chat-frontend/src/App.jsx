import { useState, useEffect } from 'react';
import { isAuthenticated } from './utils/auth';
import AuthForm from './components/AuthForm';
import ChatRoom from './components/ChatRoom';

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(isAuthenticated());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="App">
      {authenticated ? (
        <ChatRoom onLogout={handleLogout} />
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
