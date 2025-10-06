const Message = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}>
      <div className={`message-bubble ${isOwn ? 'message-own' : 'message-other'}`}>
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold text-sm">{message.username}</span>
          <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
        </div>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
