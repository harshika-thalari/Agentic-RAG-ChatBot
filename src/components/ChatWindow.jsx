import React, { useRef, useEffect, useState } from 'react';
import { modifyResponse, rateMessage } from '../api/mockApi';

const ChatWindow = ({ messages, threadId, onModifiedMessage, onRefreshChat, onClearChat }) => {
  const chatWindowRef = useRef(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [modifyMenuOpen, setModifyMenuOpen] = useState(null);
  const [rateMenuOpen, setRateMenuOpen] = useState(null);
  const [ratingFeedback, setRatingFeedback] = useState(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, ratingFeedback]);

  useEffect(() => {
    if (ratingFeedback) {
      const timer = setTimeout(() => {
        setRatingFeedback(null);
      }, 2500); // Disappear after 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [ratingFeedback]);

  const handleModifyClick = (messageId, action) => {
    const originalMessage = messages.find(msg => msg.id === messageId);
    if (!originalMessage) return;

    modifyResponse({
      response: originalMessage.text,
      action: action,
      thread_id: threadId
    }).then(response => {
      const modifiedMessage = {
        id: response.response_msg_id,
        sender: 'ai',
        text: response.response_text,
        isModified: true
      };
      onModifiedMessage(originalMessageId, modifiedMessage);
      setModifyMenuOpen(null);
    });
  };

  const handleRateClick = (messageId, rating) => {
    rateMessage({
      response_msg_id: messageId,
      rating: rating,
      thread_id: threadId
    }).then(() => {
      const feedbackText = rating === 'up' ? 'Rating saved! 👍' : 'Rating saved! 👎';
      setRatingFeedback({ text: feedbackText, messageId });
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
    <div className="chat-window-container">
      <div className="chat-window-header">
        <h3 className="header-title">Chat Conversation</h3>
        <div className="chat-window-actions">
          <button className="chat-action-btn" onClick={onRefreshChat}>
            <span className="icon">🔄</span> Refresh
          </button>
          <button className="chat-action-btn clear-btn" onClick={onClearChat}>
            <span className="icon">🗑️</span> Clear Chat
          </button>
        </div>
      </div>
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
            {ratingFeedback && ratingFeedback.messageId === msg.id && (
              <div className="rating-feedback-container">
                <span className="rating-feedback-message">{ratingFeedback.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;