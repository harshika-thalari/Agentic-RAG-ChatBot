import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form className="input-area" onSubmit={handleSend}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Send a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;