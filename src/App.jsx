import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import LoginPage from './components/LoginPage';
import { getProfile, questionStream } from './api/mockApi';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const DUMMY_USER_EMAIL = "harshika@example.com";
  const DUMMY_USER_ID = "user-123";

  const handleLogin = async (email) => {
    if (email === DUMMY_USER_EMAIL) {
      alert("Login successful!");
      setIsLoggedIn(true);
      const response = await getProfile(DUMMY_USER_EMAIL);
      console.log("User Profile:", response.body);
    } else {
      alert("Login failed: Incorrect email.");
    }
  };

  const handleSendMessage = async (input) => {
    const userMessage = { id: "user-" + Date.now(), sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await questionStream({
      query: input,
      thread_id: activeChatId,
      new_chat: !activeChatId,
      user_id: DUMMY_USER_ID,
      email_id: DUMMY_USER_EMAIL
    });

    const aiMessage = { id: response.response_msg_id, sender: 'ai', text: response.response_text, isModified: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    
    if (!activeChatId) {
      setActiveChatId(response.thread_id);
    }
  };

  const handleModifiedMessage = (originalMessageId, modifiedMessage) => {
    setMessages(prevMessages => {
      // Find the index of the original message
      const index = prevMessages.findIndex(msg => msg.id === originalMessageId);
      if (index !== -1) {
        // Create a new array with the modified message inserted after the original
        const newMessages = [...prevMessages];
        newMessages.splice(index + 1, 0, modifiedMessage);
        return newMessages;
      }
      return prevMessages;
    });
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setMessages([
      { id: "ai-1", sender: 'ai', text: `You've selected chat ID: ${chatId}.` },
      { id: "ai-2", sender: 'ai', text: `This is a dummy chat history.` },
    ]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar onSelectChat={handleSelectChat} />
      <div className="main-content">
        <ChatWindow 
          messages={messages} 
          threadId={activeChatId}
          onModifiedMessage={handleModifiedMessage}
        />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;