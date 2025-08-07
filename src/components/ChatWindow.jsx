import React, { useRef, useEffect, useState } from 'react';
import { modifyResponse, rateMessage } from '../api/mockApi';

const ChatWindow = ({ messages, threadId, onNewMessage, onModifiedMessage }) => {
  const chatWindowRef = useRef(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [modifyMenuOpen, setModifyMenuOpen] = useState(null);
  const [rateMenuOpen, setRateMenuOpen] = useState(null);
  const [modifiedMessages, setModifiedMessages] = useState({});

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, modifiedMessages]);

  const handleModifyClick = (messageId, action) => {
    const originalMessage = messages.find(msg => msg.id === messageId);
    if (!originalMessage) return;

    // Simulate the API call
    modifyResponse({
      response: originalMessage.text,
      action: action,
      thread_id: threadId
    }).then(response => {
      // Update the message state with the modified message
      const modifiedMessage = {
        id: response.response_msg_id,
        sender: 'ai',
        text: response.response_text,
        isModified: true
      };
      // onNewMessage(modifiedMessage); // Or use a different handler
      // Or, better, update the existing message in the state
      onModifiedMessage(messageId, modifiedMessage);
      setModifyMenuOpen(null);
    });
  };

  const handleRateClick = (messageId, rating) => {
    rateMessage({
      response_msg_id: messageId,
      rating: rating,
      thread_id: threadId
    }).then(response => {
      alert(response.message);
      setRateMenuOpen(null);
    });
  };

  const renderModifyMenu = (messageId) => {
    const options = ["shorter", "longer", "more_professional", "more_casual", "simpler"];
    return (
      <div className="dropdown-menu">
        {options.map(option => (
          <div
            key={option}
            className="dropdown-item"
            onClick={() => handleModifyClick(messageId, option)}
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  const renderRateMenu = (messageId) => {
    const options = ["up", "down"];
    return (
      <div className="dropdown-menu">
        {options.map(option => (
          <div
            key={option}
            className="dropdown-item"
            onClick={() => handleRateClick(messageId, option)}
          >
            {option === 'up' ? '👍' : '👎'}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {messages.map((msg, index) => (
        <div
          key={msg.id || index}
          className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          onMouseEnter={() => setHoveredMessageId(msg.id)}
          onMouseLeave={() => {
            setHoveredMessageId(null);
            setModifyMenuOpen(null);
            setRateMenuOpen(null);
          }}
        >
          {msg.isModified && <div className="modified-label">Modified*</div>}
          {msg.text}
          {msg.sender === 'ai' && hoveredMessageId === msg.id && (
            <div className="message-actions">
              <div className="action-menu">
                <div
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModifyMenuOpen(modifyMenuOpen === msg.id ? null : msg.id);
                    setRateMenuOpen(null);
                  }}
                >
                  📝
                </div>
                {modifyMenuOpen === msg.id && renderModifyMenu(msg.id)}
              </div>
              <div className="action-menu">
                <div
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRateMenuOpen(rateMenuOpen === msg.id ? null : msg.id);
                    setModifyMenuOpen(null);
                  }}
                >
                  ⭐
                </div>
                {rateMenuOpen === msg.id && renderRateMenu(msg.id)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;