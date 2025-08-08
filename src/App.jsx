// // // import React, { useState, useEffect } from 'react';
// // // import Sidebar from './components/Sidebar';
// // // import ChatWindow from './components/ChatWindow';
// // // import MessageInput from './components/MessageInput';
// // // import LoginPage from './components/LoginPage';
// // // import { getProfile, questionStream, getFollowupQuestions } from './api/mockApi';
// // // import './index.css';

// // // function App() {
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [messages, setMessages] = useState([]);
// // //   const [activeChatId, setActiveChatId] = useState(null);
// // //   const [followupQuestions, setFollowupQuestions] = useState([]);
// // //   const DUMMY_USER_EMAIL = "harshika@example.com";
// // //   const DUMMY_USER_ID = "user-123";

// // //   const handleLogin = async (email) => {
// // //     if (email === DUMMY_USER_EMAIL) {
// // //       alert("Login successful!");
// // //       setIsLoggedIn(true);
// // //       const response = await getProfile(DUMMY_USER_EMAIL);
// // //       console.log("User Profile:", response.body);
// // //     } else {
// // //       alert("Login failed: Incorrect email.");
// // //     }
// // //   };

// // //   const handleSendMessage = async (input) => {
// // //     const userMessage = { id: "user-" + Date.now(), sender: 'user', text: input };
// // //     setMessages((prevMessages) => [...prevMessages, userMessage]);
// // //     setFollowupQuestions([]); 

// // //     const response = await questionStream({
// // //       query: input,
// // //       thread_id: activeChatId,
// // //       new_chat: !activeChatId,
// // //       user_id: DUMMY_USER_ID,
// // //       email_id: DUMMY_USER_EMAIL
// // //     });

// // //     const aiMessage = { id: response.response_msg_id, sender: 'ai', text: response.response_text, isModified: false };
// // //     setMessages((prevMessages) => [...prevMessages, aiMessage]);
    
// // //     if (!activeChatId) {
// // //       setActiveChatId(response.thread_id);
// // //     }

// // //     const followupResponse = await getFollowupQuestions({ response: response.response_text });
// // //     setFollowupQuestions(followupResponse.followup_questions);
// // //   };

// // //   const handleModifiedMessage = (originalMessageId, modifiedMessage) => {
// // //     setMessages(prevMessages => {
// // //       const index = prevMessages.findIndex(msg => msg.id === originalMessageId);
// // //       if (index !== -1) {
// // //         const newMessages = [...prevMessages];
// // //         newMessages.splice(index + 1, 0, modifiedMessage);
// // //         return newMessages;
// // //       }
// // //       return prevMessages;
// // //     });

// // //     getFollowupQuestions({ response: modifiedMessage.text }).then(response => {
// // //       setFollowupQuestions(response.followup_questions);
// // //     });
// // //   };

// // //   const handleSelectChat = (chatId) => {
// // //     setActiveChatId(chatId);
// // //     setMessages([
// // //       { id: "ai-1", sender: 'ai', text: `You've selected chat ID: ${chatId}.` },
// // //       { id: "ai-2", sender: 'ai', text: `This is a dummy chat history.` },
// // //     ]);
// // //     setFollowupQuestions([]);
// // //   };

// // //   const handleRefreshChat = () => {
// // //     setMessages([
// // //       { id: "ai-1", sender: 'ai', text: `Chat refreshed. This is the latest message.` },
// // //       { id: "ai-2", sender: 'ai', text: `A dummy message to simulate chat history.` },
// // //     ]);
// // //     setFollowupQuestions([]);
// // //   };

// // //   const handleClearChat = () => {
// // //     setMessages([]);
// // //     setFollowupQuestions([]);
// // //   };

// // //   if (!isLoggedIn) {
// // //     return <LoginPage onLogin={handleLogin} />;
// // //   }

// // //   return (
// // //     <div className="app-container">
// // //       <Sidebar onSelectChat={handleSelectChat} />
// // //       <div className="main-content">
// // //         <ChatWindow 
// // //           messages={messages} 
// // //           threadId={activeChatId}
// // //           onModifiedMessage={handleModifiedMessage}
// // //           onRefreshChat={handleRefreshChat}
// // //           onClearChat={handleClearChat}
// // //         />
// // //         <MessageInput 
// // //           onSendMessage={handleSendMessage} 
// // //           followupQuestions={followupQuestions}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;
// // import React, { useState, useEffect } from 'react';
// // import Sidebar from './components/Sidebar';
// // import ChatWindow from './components/ChatWindow';
// // import MessageInput from './components/MessageInput';
// // import LoginPage from './components/LoginPage';
// // import ImageViewer from './components/ImageViewer'; // We will create this next
// // import { useAuth } from './context/AuthContext'; // Use the new context
// // import { questionStream, getFollowupQuestions, getAllChats } from './api/apiService'; // Use the new service
// // import './index.css';

// // function App() {
// //   const { user, login, isLoggedIn } = useAuth(); // Get user and login from context
// //   const [messages, setMessages] = useState([]);
// //   const [chats, setChats] = useState([]); // State for the chat list
// //   const [activeChatId, setActiveChatId] = useState(null);
// //   const [followupQuestions, setFollowupQuestions] = useState([]);
// //   const [imageIds, setImageIds] = useState([]); // State for image IDs from response
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Fetch all chats when the user logs in
// //   // src/App.jsx

// // // ... other code ...

// // // --- REVISED AND SAFER useEffect ---
// // useEffect(() => {
// //   // We only proceed if the user object and its id actually exist.
// //   if (user && user.id) { 
// //     const fetchUserChats = async () => {
// //       try {
// //         const chatData = await getAllChats(user.id);
// //         // The API returns an array directly, not an object with a 'chats' property.
// //         // Let's check your backend `get_all_chats_from_user`... yes, it returns a list.
// //         setChats(chatData || []); // Ensure we set an array even if the response is null/undefined
// //       } catch (error) {
// //         console.error("Failed to fetch chats:", error);
// //         setChats([]); // Set to empty on error
// //       }
// //     };
    
// //     fetchUserChats();
// //   }
// // }, [user]); // The only dependency we need is the user object itself.


// //   const handleLogin = async (email) => {
// //     await login(email);
// //   };

// //   const handleSendMessage = async (input) => {
// //     if (isLoading) return; // Prevent sending while a response is streaming

// //     setIsLoading(true);
// //     const userMessage = { id: `user-${Date.now()}`, from: 'user', text: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setFollowupQuestions([]);
// //     setImageIds([]);

// //     // Add a placeholder for the AI response
// //     const aiMessageId = `ai-${Date.now()}`;
// //     const aiPlaceholder = { id: aiMessageId, from: 'ai', text: '', isStreaming: true };
// //     setMessages((prev) => [...prev, aiPlaceholder]);
    
// //     try {
// //       const params = {
// //         query: input,
// //         thread_id: activeChatId,
// //         new_chat: !activeChatId,
// //         user_id: user.id,
// //         email_id: user.email
// //       };

// //       // This is the callback that updates the message chunk by chunk
// //       const handleStreamData = (chunk) => {
// //         setMessages(prev => prev.map(msg => 
// //           msg.id === aiMessageId ? { ...msg, text: msg.text + chunk } : msg
// //         ));
// //       };

// //       const headers = await questionStream(params, handleStreamData);
      
// //       // Finalize the AI message
// //       setMessages(prev => prev.map(msg => 
// //         msg.id === aiMessageId ? { ...msg, id: headers.response_msg_id, isStreaming: false } : msg
// //       ));
      
// //       // Update state with new data from headers
// //       if (!activeChatId) {
// //         setActiveChatId(headers.thread_id);
// //       }
// //       setImageIds(headers.img_ids);
      
// //       // Fetch follow-up questions after the full response is received
// //       const fullResponseText = messages.find(m => m.id === aiMessageId)?.text || '';
// //       const followupResponse = await getFollowupQuestions(fullResponseText);
// //       setFollowupQuestions(followupResponse.followup_questions);

// //     } catch (error) {
// //       console.error("Error during streaming:", error);
// //       setMessages(prev => prev.map(msg => 
// //         msg.id === aiMessageId ? { ...msg, text: 'Sorry, an error occurred.', isStreaming: false, isError: true } : msg
// //       ));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // This function needs to be updated for streaming as well, but we'll keep it simple for now
// //   const handleModifiedMessage = (originalMessageId, modifiedMessage) => {
// //     // This logic needs a full streaming implementation similar to handleSendMessage
// //     console.log("Modification logic needs to be updated to support streaming.");
// //   };
  
// //   const handleSelectChat = (chatId) => {
// //     const selectedChat = chats.find(c => c.id === chatId);
// //     if (selectedChat) {
// //       setActiveChatId(selectedChat.id);
// //       setMessages(selectedChat.messages || []); // Load history
// //       setFollowupQuestions([]);
// //       setImageIds([]);
// //     }
// //   };

// //   // This function creates a new chat session
// //   const handleNewChat = () => {
// //     setActiveChatId(null);
// //     setMessages([]);
// //     setFollowupQuestions([]);
// //     setImageIds([]);
// //   };

// //   if (!isLoggedIn) {
// //     return <LoginPage onLogin={handleLogin} />;
// //   }

// //   return (
// //     <div className="app-container">
// //       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} activeChatId={activeChatId} />
// //       <div className="main-content">
// //         <ChatWindow 
// //           messages={messages} 
// //           threadId={activeChatId}
// //           onModifiedMessage={handleModifiedMessage}
// //         />
// //         <MessageInput 
// //           onSendMessage={handleSendMessage} 
// //           followupQuestions={followupQuestions}
// //           isLoading={isLoading}
// //         />
// //       </div>
// //       <ImageViewer imageIds={imageIds} />
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
// import ChatWindow from './components/ChatWindow';
// import MessageInput from './components/MessageInput';
// import LoginPage from './components/LoginPage';
// import ImageViewer from './components/ImageViewer';
// import { useAuth } from './context/AuthContext';
// import { 
//   questionStream, 
//   getFollowupQuestions, 
//   getAllChats, 
//   rateMessage, 
//   modifyResponse 
// } from './api/apiService';
// import './index.css';

// function App() {
//   const { user, login, isLoggedIn } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [followupQuestions, setFollowupQuestions] = useState([]);
//   const [imageIds, setImageIds] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch all chats when the user logs in
//   useEffect(() => {
//     if (user && user.id) {
//       const fetchUserChats = async () => {
//         try {
//           const chatData = await getAllChats(user.id);
//           setChats(chatData || []);
//         } catch (error) {
//           console.error("Failed to fetch chats:", error);
//           setChats([]);
//         }
//       };
//       fetchUserChats();
//     }
//   }, [user]);

//   // The main function to ask a question
//   const handleSendMessage = async (input) => {
//     if (isLoading) return;

//     setIsLoading(true);
//     const userMessage = { id: `user-${Date.now()}`, from: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setFollowupQuestions([]);
//     setImageIds([]);

//     const aiMessageId = `ai-${Date.now()}`;
//     setMessages((prev) => [...prev, { id: aiMessageId, from: 'ai', text: '', isStreaming: true }]);
    
//     let fullResponseText = "";
//     try {
//       const params = {
//         query: input,
//         thread_id: activeChatId,
//         new_chat: !activeChatId,
//         user_id: user.id,
//         email_id: user.email
//       };

//       const handleStreamData = (chunk) => {
//         fullResponseText += chunk;
//         setMessages(prev => prev.map(msg => 
//           msg.id === aiMessageId ? { ...msg, text: msg.text + chunk } : msg
//         ));
//       };

//       const headers = await questionStream(params, handleStreamData);
      
//       setMessages(prev => prev.map(msg => 
//         msg.id === aiMessageId ? { ...msg, id: headers.get('response_msg_id'), isStreaming: false } : msg
//       ));
      
//       if (!activeChatId) {
//         setActiveChatId(headers.get('thread_id'));
//       }
//       setImageIds(JSON.parse(headers.get('img_ids') || '[]'));
      
//       const followupResponse = await getFollowupQuestions(fullResponseText);
//       setFollowupQuestions(followupResponse.followup_questions);

//     } catch (error) {
//       console.error("Error during streaming:", error);
//       setMessages(prev => prev.map(msg => 
//         msg.id === aiMessageId ? { ...msg, text: `Sorry, an error occurred: ${error.message}`, isStreaming: false, isError: true } : msg
//       ));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handler for rating a message
//   const handleRateMessage = async (messageId, rating) => {
//     try {
//       await rateMessage({
//         thread_id: activeChatId,
//         response_msg_id: messageId,
//         rating: rating,
//       });
//       // Optionally update the UI to show the message has been rated
//       setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, rating } : msg));
//     } catch (error) {
//       console.error("Failed to rate message:", error);
//       alert("Failed to save rating.");
//     }
//   };

//   // Handler for modifying a response
//   const handleModifyResponse = async (originalMessage, action) => {
//     if (isLoading) return;
    
//     setIsLoading(true);
//     setFollowupQuestions([]);
    
//     const modifiedMessageId = `ai-modified-${Date.now()}`;
//     setMessages((prev) => [...prev, { id: modifiedMessageId, from: 'ai', text: '', isStreaming: true, isModified: true }]);
    
//     let fullResponseText = "";
//     try {
//       const params = {
//         response: originalMessage.text,
//         action: action,
//         thread_id: activeChatId
//       };

//       const handleStreamData = (chunk) => {
//         fullResponseText += chunk;
//         setMessages(prev => prev.map(msg => 
//           msg.id === modifiedMessageId ? { ...msg, text: msg.text + chunk } : msg
//         ));
//       };

//       const headers = await modifyResponse(params, handleStreamData);

//       setMessages(prev => prev.map(msg => 
//         msg.id === modifiedMessageId ? { ...msg, id: headers.get('response_msg_id'), isStreaming: false } : msg
//       ));
      
//       const followupResponse = await getFollowupQuestions(fullResponseText);
//       setFollowupQuestions(followupResponse.followup_questions);

//     } catch (error) {
//       console.error("Error during modification:", error);
//       setMessages(prev => prev.map(msg => 
//         msg.id === modifiedMessageId ? { ...msg, text: `Sorry, an error occurred: ${error.message}`, isStreaming: false, isError: true } : msg
//       ));
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const handleSelectChat = (chatId) => {
//     const selectedChat = chats.find(c => c.id === chatId);
//     if (selectedChat) {
//       setActiveChatId(selectedChat.id);
//       const standardizedMessages = (selectedChat.messages || []).map(msg => ({
//         ...msg,
//         id: msg.message_id, // Create the 'id' property
//       }));
//       // Your backend returns `messages` inside the chat object. Use it.
//       setMessages(standardizedMessages);
//       setFollowupQuestions([]);
//       setImageIds([]);
//     }
//   };

//   const handleNewChat = () => {
//     setActiveChatId(null);
//     setMessages([]);
//     setFollowupQuestions([]);
//     setImageIds([]);
//   };

//   if (!isLoggedIn) {
//     return <LoginPage onLogin={login} />;
//   }

//   return (
//     <div className="app-container">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} activeChatId={activeChatId} />
//       <div className="main-content">
//         <ChatWindow 
//           messages={messages} 
//           onRateMessage={handleRateMessage}
//           onModifyResponse={handleModifyResponse}
//         />
//         <MessageInput 
//           onSendMessage={handleSendMessage} 
//           followupQuestions={followupQuestions}
//           isLoading={isLoading}
//         />
//       </div>
//       <ImageViewer imageIds={imageIds} />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import LoginPage from './components/LoginPage';
import ImageViewer from './components/ImageViewer';
import { useAuth } from './context/AuthContext';
import { 
  questionStream, 
  getFollowupQuestions, 
  getAllChats, 
  rateMessage, 
  modifyResponse 
} from './api/apiService';
import './index.css';

function App() {
  const { user, login, isLoggedIn } = useAuth();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [followupQuestions, setFollowupQuestions] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      const fetchUserChats = async () => {
        try {
          const chatData = await getAllChats(user.id);
          setChats(chatData || []);
        } catch (error) {
          console.error("Failed to fetch chats:", error);
          setChats([]);
        }
      };
      fetchUserChats();
    }
  }, [user]);

  const handleSendMessage = async (input) => {
    if (isLoading) return;

    setIsLoading(true);
    const userMessage = { id: `user-${Date.now()}`, from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setFollowupQuestions([]);
    setImageIds([]);

    const aiMessageId = `ai-${Date.now()}`;
    setMessages((prev) => [...prev, { id: aiMessageId, from: 'ai', text: '', isStreaming: true }]);
    
    let fullResponseText = "";
    try {
      const params = {
        query: input,
        thread_id: activeChatId,
        new_chat: !activeChatId,
        user_id: user.id,
        email_id: user.email
      };

      const handleStreamData = (chunk) => {
        fullResponseText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: msg.text + chunk } : msg
        ));
      };

      const headers = await questionStream(params, handleStreamData);
      
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, id: headers.get('response_msg_id'), isStreaming: false } : msg
      ));
      
      if (!activeChatId) {
        setActiveChatId(headers.get('thread_id'));
      }
      setImageIds(JSON.parse(headers.get('img_ids') || '[]'));
      
      const followupResponse = await getFollowupQuestions(fullResponseText);
      setFollowupQuestions(followupResponse.followup_questions);

    } catch (error) {
      console.error("Error during streaming:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, text: `Sorry, an error occurred: ${error.message}`, isStreaming: false, isError: true } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRateMessage = async (messageId, rating) => {
    try {
      await rateMessage({
        thread_id: activeChatId,
        response_msg_id: messageId,
        rating: rating,
      });
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, rating } : msg));
    } catch (error) {
      console.error("Failed to rate message:", error);
      alert("Failed to save rating.");
    }
  };

  const handleModifyResponse = async (originalMessage, action) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setFollowupQuestions([]);
    
    const modifiedMessageId = `ai-modified-${Date.now()}`;
    setMessages((prev) => [...prev, { id: modifiedMessageId, from: 'ai', text: '', isStreaming: true, isModified: true }]);
    
    let fullResponseText = "";
    try {
      const params = {
        response: originalMessage.text,
        action: action,
        thread_id: activeChatId
      };

      const handleStreamData = (chunk) => {
        fullResponseText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modifiedMessageId ? { ...msg, text: msg.text + chunk } : msg
        ));
      };

      const headers = await modifyResponse(params, handleStreamData);

      setMessages(prev => prev.map(msg => 
        msg.id === modifiedMessageId ? { ...msg, id: headers.get('response_msg_id'), isStreaming: false } : msg
      ));
      
      const followupResponse = await getFollowupQuestions(fullResponseText);
      setFollowupQuestions(followupResponse.followup_questions);

    } catch (error) {
      console.error("Error during modification:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === modifiedMessageId ? { ...msg, text: `Sorry, an error occurred: ${error.message}`, isStreaming: false, isError: true } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectChat = (chatId) => {
    const selectedChat = chats.find(c => c.id === chatId);
    if (selectedChat) {
      setActiveChatId(selectedChat.id);
      
      // THE FIX: Standardize the message format
      const standardizedMessages = (selectedChat.messages || []).map(msg => ({
        ...msg,
        id: msg.id || msg.message_id, // Use existing 'id' or fallback to 'message_id'
      }));
      
      setMessages(standardizedMessages);
      setFollowupQuestions([]);
      setImageIds([]);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setFollowupQuestions([]);
    setImageIds([]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div className="app-container">
      <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} activeChatId={activeChatId} />
      <div className="main-content">
        <ChatWindow 
          messages={messages} 
          onRateMessage={handleRateMessage}
          onModifyResponse={handleModifyResponse}
        />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          followupQuestions={followupQuestions}
          isLoading={isLoading}
        />
      </div>
      <ImageViewer imageIds={imageIds} />
    </div>
  );
}

export default App;