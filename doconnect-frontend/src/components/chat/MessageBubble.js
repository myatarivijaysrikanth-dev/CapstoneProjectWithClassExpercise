import React from 'react';

const MessageBubble = ({ message, isMe }) => {
  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
const sidePadding = isMe ? { paddingRight: '4px' } : { paddingLeft: '4px' };
  return (
    <div
      className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'} mb-2`}
    >
      <span
        style={{
          fontSize: '0.75rem',
          color: '#6c757d',
          marginBottom: '2px',
           ...sidePadding 
        }}
      >
        {isMe ? 'You' : message.senderId?.username || 'User'}
      </span>

      <div className={isMe ? 'message-bubble-me' : 'message-bubble-other'}>
        {message.messageText}
      </div>

      <span
        style={{
          fontSize: '0.7rem',
          color: '#adb5bd',
          marginTop: '2px',
          paddingLeft: isMe ? '0' : '4px',
          paddingRight: isMe ? '4px' : '0',
        }}
      >
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
};

export default MessageBubble;