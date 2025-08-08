// // import React, { useRef, useEffect, useState } from 'react';
// // import { modifyResponse, rateMessage } from '../api/mockApi';
 
// // const ChatWindow = ({ messages, threadId, onModifiedMessage, onRefreshChat, onClearChat }) => {
// //   const chatWindowRef = useRef(null);
// //   const [hoveredMessageId, setHoveredMessageId] = useState(null);
// //   const [modifyMenuOpen, setModifyMenuOpen] = useState(null);
// //   const [ratingFeedback, setRatingFeedback] = useState(null);
 
// //   useEffect(() => {
// //     if (chatWindowRef.current) {
// //       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
// //     }
// //   }, [messages, ratingFeedback]);
 
// //   useEffect(() => {
// //     if (ratingFeedback) {
// //       const timer = setTimeout(() => {
// //         setRatingFeedback(null);
// //       }, 2500); // Disappear after 2.5 seconds
// //       return () => clearTimeout(timer);
// //     }
// //   }, [ratingFeedback]);
 
// //   const handleModifyClick = (messageId, action) => {
// //     const originalMessage = messages.find(msg => msg.id === messageId);
// //     if (!originalMessage) return;
 
// //     modifyResponse({
// //       response: originalMessage.text,
// //       action: action,
// //       thread_id: threadId
// //     }).then(response => {
// //       const modifiedMessage = {
// //         id: response.response_msg_id,
// //         sender: 'ai',
// //         text: response.response_text,
// //         isModified: true
// //       };
// //       onModifiedMessage(originalMessage.id, modifiedMessage);
// //       setModifyMenuOpen(null);
// //     });
// //   };
 
// //   const handleRateClick = (messageId, rating) => {
// //     rateMessage({
// //       response_msg_id: messageId,
// //       rating: rating,
// //       thread_id: threadId
// //     }).then(() => {
// //       const feedbackText = rating === 'up' ? 'Rating saved! 👍' : 'Rating saved! 👎';
// //       setRatingFeedback({ text: feedbackText, messageId });
// //     });
// //   };
 
// //   const handleCopyClick = (text) => {
// //     navigator.clipboard.writeText(text).then(() => {
// //       setRatingFeedback({ text: 'Copied to clipboard!', messageId: null });
// //     }).catch(err => {
// //       console.error('Failed to copy text: ', err);
// //     });
// //   };
 
// //   const handleShareClick = (messageId) => {
// //     const message = messages.find(msg => msg.id === messageId);
// //     if (navigator.share) {
// //       navigator.share({
// //         title: 'AI Chat Response',
// //         text: message.text,
// //       }).catch(err => console.error('Failed to share:', err));
// //     } else {
// //       console.log('Web Share API not supported. Message ID:', messageId);
// //       // Fallback for browsers that don't support the API
// //       setRatingFeedback({ text: 'Share functionality not available.', messageId });
// //     }
// //   };
 
// //   const renderModifyMenu = (messageId) => {
// //     const options = ["shorter", "longer", "more_professional", "more_casual", "simpler"];
// //     return (
// //       <div className="dropdown-menu">
// //         {options.map(option => (
// //           <div
// //             key={option}
// //             className="dropdown-item"
// //             onClick={() => handleModifyClick(messageId, option)}
// //           >
// //             {option}
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };
 
// //   const renderShareMenu = (messageId) => {
// //     const message = messages.find(msg => msg.id === messageId);
// //     return (
// //       <div className="dropdown-menu">
// //         <div className="dropdown-item" onClick={() => handleCopyClick(message.text)}>
// //           Copy
// //         </div>
// //         <div className="dropdown-item" onClick={() => handleShareClick(messageId)}>
// //           Share
// //         </div>
// //       </div>
// //     );
// //   };
 
// //   return (
// //     <div className="chat-window-container">
// //       <div className="chat-window-header">
// //         <h3 className="header-title">Chat Conversation</h3>
// //         <div className="chat-window-actions">
// //           <button className="chat-action-btn" onClick={onRefreshChat}>
// //             <span className="icon">🔄</span> Refresh
// //           </button>
// //           <button className="chat-action-btn clear-btn" onClick={onClearChat}>
// //             <span className="icon">🗑️</span> Clear Chat
// //           </button>
// //         </div>
// //       </div>
// //       <div className="chat-window" ref={chatWindowRef}>
// //         {messages.map((msg, index) => (
// //           <div
// //             key={msg.id || index}
// //             className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
// //             onMouseEnter={() => setHoveredMessageId(msg.id)}
// //             onMouseLeave={() => setHoveredMessageId(null)}
// //           >
// //             {msg.isModified && <div className="modified-label">Modified*</div>}
// //             {msg.text}
// //             {msg.sender === 'ai' && (hoveredMessageId === msg.id || modifyMenuOpen === msg.id) && (
// //               <div className="message-actions-new">
// //                 <div className="action-row">
// //                   <div className="action-group">
// //                     <button className="action-icon-new" onClick={() => handleRateClick(msg.id, 'up')}>
// //                       👍
// //                     </button>
// //                     <button className="action-icon-new" onClick={() => handleRateClick(msg.id, 'down')}>
// //                       👎
// //                     </button>
// //                   </div>
// //                   <div className="action-group">
// //                     <button className="action-icon-new" onClick={() => handleCopyClick(msg.text)}>
// //                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
// //                     </button>
// //                     <button className="action-icon-new">
// //                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
// //                     </button>
// //                     <div className="action-menu">
// //                       <button
// //                         className="action-icon-new"
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           setModifyMenuOpen(modifyMenuOpen === msg.id ? null : msg.id);
// //                         }}
// //                       >
// //                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M21 5H3v4"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M3 19h18v-4"></path></svg>
// //                       </button>
// //                       {modifyMenuOpen === msg.id && renderModifyMenu(msg.id)}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //             {ratingFeedback && ratingFeedback.messageId === msg.id && (
// //               <div className="rating-feedback-container">
// //                 <span className="rating-feedback-message">{ratingFeedback.text}</span>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };
 
// // export default ChatWindow;
// import React, { useRef, useEffect, useState } from 'react';

// // This component now receives handlers for rating and modifying from App.jsx
// const ChatWindow = ({ messages, onRateMessage, onModifyResponse }) => {
//   const chatWindowRef = useRef(null);
//   const [hoveredMessageId, setHoveredMessageId] = useState(null);
//   const [modifyMenuOpen, setModifyMenuOpen] = useState(null);
//   const [feedback, setFeedback] = useState(null); // For copy/rating feedback

//   // Auto-scroll to the bottom
//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Timer to hide feedback messages
//   useEffect(() => {
//     if (feedback) {
//       const timer = setTimeout(() => setFeedback(null), 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [feedback]);

//   // Handler for modifying a response
//   const handleModifyClick = (message, action) => {
//     onModifyResponse(message, action); // Pass the whole message object and action up to App.jsx
//     setModifyMenuOpen(null);
//   };

//   // Handler for rating a message
//   const handleRateClick = (messageId, rating) => {
//     onRateMessage(messageId, rating); // Pass ID and rating up
//     const feedbackText = rating === 'up' ? 'Rating saved! 👍' : 'Rating saved! 👎';
//     setFeedback({ text: feedbackText, messageId });
//   };

//   const handleCopyClick = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setFeedback({ text: 'Copied to clipboard!', messageId: hoveredMessageId });
//     });
//   };

//   const renderModifyMenu = (message) => {
//     const options = ["shorter", "longer", "more_professional", "more_casual", "simpler"];
//     return (
//       <div className="dropdown-menu">
//         {options.map(option => (
//           <div key={option} className="dropdown-item" onClick={() => handleModifyClick(message, option)}>
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   return (
//     <div className="chat-window-container">
//       <div className="chat-window-header">
//         <h3 className="header-title">Safety Process AI</h3>
//       </div>
//       <div className="chat-window" ref={chatWindowRef}>
// {messages.map((msg) => (
//     <div
//         key={msg.id}
//         className={`message ${msg.from === 'user' ? 'user-message' : 'ai-message'}`}
//         onMouseEnter={() => !msg.isStreaming && setHoveredMessageId(msg.id)}
//         onMouseLeave={() => setHoveredMessageId(null)}
//     >
//         {msg.isModified && <div className="modified-label">Modified*</div>}
        
//         {msg.isStreaming ? <div className="typing-indicator"><span></span><span></span><span></span></div> : msg.text}
//         {msg.from === 'ai' && !msg.isStreaming && hoveredMessageId === msg.id && (
//             <div className="message-actions-new">
//                 <div className="action-row">
//                     <div className="action-group">
//                         <button className="action-icon-new" onClick={() => handleRateClick(msg.id, 'up')}>👍</button>
//                         <button className="action-icon-new" onClick={() => handleRateClick(msg.id, 'down')}>👎</button>
//                     </div>
//                     <div className="action-group">
//                         <button className="action-icon-new" onClick={() => handleCopyClick(msg.text)}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
//                         </button>
//                         <div className="action-menu">
//                             <button className="action-icon-new" onClick={(e) => { e.stopPropagation(); setModifyMenuOpen(modifyMenuOpen === msg.id ? null : msg.id); }}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M21 5H3v4"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M3 19h18v-4"></path></svg>
//                             </button>
//                             {modifyMenuOpen === msg.id && renderModifyMenu(msg)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}
//             {feedback && feedback.messageId === msg.id && (
//               <div className="rating-feedback-container">
//                 <span className="rating-feedback-message">{feedback.text}</span>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
import React, { useRef, useEffect, useState } from 'react';

const ChatWindow = ({ messages, onRateMessage, onModifyResponse }) => {
  const chatWindowRef = useRef(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null); // Stores the ID of the single message being hovered
  const [modifyMenuOpen, setModifyMenuOpen] = useState(null);   // Stores the ID of the single message whose menu is open
  const [feedback, setFeedback] = useState(null);               // For copy/rating feedback popups

  // Auto-scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Timer to hide feedback messages after a few seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // --- Event Handlers ---

  const handleModifyClick = (message, action) => {
    onModifyResponse(message, action); // Pass the action up to App.jsx
    setModifyMenuOpen(null); // Close the menu after clicking
  };

  const handleRateClick = (messageId, rating) => {
    onRateMessage(messageId, rating); // Pass the rating up to App.jsx
    const feedbackText = rating === 'up' ? 'Rating saved! 👍' : 'Rating saved! 👎';
    setFeedback({ text: feedbackText, messageId });
  };

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setFeedback({ text: 'Copied to clipboard!', messageId: hoveredMessageId });
    });
  };

  // --- Render Functions ---

  const renderModifyMenu = (message) => {
    const options = ["shorter", "longer", "more_professional", "more_casual", "simpler"];
    return (
      <div className="dropdown-menu">
        {options.map(option => (
          <div key={option} className="dropdown-item" onClick={() => handleModifyClick(message, option)}>
            {option}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="chat-window-container">
      <div className="chat-window-header">
        <h3 className="header-title">Safety Process AI</h3>
      </div>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.from === 'user' ? 'user-message' : 'ai-message'}`}
            // FIX #1: Set the hovered ID on enter and clear it on leave
            onMouseEnter={() => !msg.isStreaming && setHoveredMessageId(msg.id)}
            onMouseLeave={() => setHoveredMessageId(null)}
          >
            {msg.isModified && <div className="modified-label">Modified*</div>}
            
            {msg.isStreaming ? <div className="typing-indicator"><span></span><span></span><span></span></div> : msg.text}
            
            {/* FIX #2: Show actions ONLY if this specific message's ID matches the hovered ID */}
            {msg.from === 'ai' && !msg.isStreaming && hoveredMessageId === msg.id && (
              <div className="message-actions-new">
                <div className="action-row">
                  <div className="action-group">
                    <button className="action-icon-new" onClick={() => handleRateClick(msg.id, 'up')}>👍</button>
                    <button className="action-icon-new" onClick={() => handleRateClick(msg.id, 'down')}>👎</button>
                  </div>
                  <div className="action-group">
                    <button className="action-icon-new" onClick={() => handleCopyClick(msg.text)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <div className="action-menu">
                      <button 
                        className="action-icon-new" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setModifyMenuOpen(prevId => (prevId === msg.id ? null : msg.id));
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M21 5H3v4"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M3 19h18v-4"></path></svg>
                      </button>
                      
                      {/* FIX #3: Show menu ONLY if this specific message's ID matches the open menu ID */}
                      {modifyMenuOpen === msg.id && renderModifyMenu(msg)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {feedback && feedback.messageId === msg.id && (
              <div className="rating-feedback-container">
                <span className="rating-feedback-message">{feedback.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;