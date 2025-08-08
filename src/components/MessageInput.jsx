import React, { useState } from 'react';

// We receive onSendMessage, followupQuestions, and isLoading as props from App.jsx
const MessageInput = ({ onSendMessage, followupQuestions, isLoading }) => {
  const [input, setInput] = useState('');

  // This is the function that handles the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  // This function handles clicking on a follow-up question
  const handleFollowupClick = (question) => {
    if (!isLoading) {
        onSendMessage(question);
        setInput('');
    }
  };

  return (
    <div className="input-area">
      {followupQuestions && followupQuestions.length > 0 && (
        <div className="followup-questions">
          {followupQuestions.map((question, index) => (
            <button
              key={index}
              className="followup-question-btn"
              onClick={() => handleFollowupClick(question)}
              disabled={isLoading}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* The form's onSubmit now correctly points to our defined function */}
      <form className="input-container" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoading ? "Waiting for response..." : "Send a message..."}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;