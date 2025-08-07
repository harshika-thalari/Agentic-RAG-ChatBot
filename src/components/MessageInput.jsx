import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, followupQuestions }) => {
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleFollowupClick = (question) => {
    onSendMessage(question);
    setInput('');
  };

  return (
    <div className="input-area">
      {followupQuestions.length > 0 && (
        <div className="followup-questions">
          {followupQuestions.map((question, index) => (
            <button
              key={index}
              className="followup-question-btn"
              onClick={() => handleFollowupClick(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
      <form className="input-container" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageInput;