import React, { useState } from 'react';

const ChatItem = ({ chat, onSelectChat, activeChatId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation(); // Prevents the chat item click from being triggered
    setIsExpanded(!isExpanded);
  };

  const lastMessageText = chat.messages?.slice(-1)[0]?.text || 'No messages yet';
  const shouldShowToggle = lastMessageText.length > 50; // Condition to show the "More/Less" button

  return (
    <div
      key={chat.id}
      className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
      onClick={() => onSelectChat(chat.id)}
    >
      <div className="chat-info">
        <h4>{chat.title}</h4>
        <p className={isExpanded ? 'expanded' : ''}>
          {lastMessageText}
        </p>
        {shouldShowToggle && (
          <button className="toggle-expand-btn" onClick={toggleExpand}>
            {isExpanded ? 'Less' : 'More'}
          </button>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ chats, onSelectChat, onNewChat, activeChatId }) => {
  return (
    <div className="sidebar">
      <h2>Conversations</h2>
      <button className="new-chat-btn" onClick={onNewChat}>+ New Chat</button>
      <div className="chat-list">
        {chats.map(chat => (
          <ChatItem 
            key={chat.id} 
            chat={chat} 
            onSelectChat={onSelectChat} 
            activeChatId={activeChatId}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;