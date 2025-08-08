// import React, { useState, useEffect } from 'react';
// import { getAllChats } from '../api/mockApi';

// const Sidebar = ({ onSelectChat }) => {
//   const [chats, setChats] = useState([]);
//   const DUMMY_USER_ID = "user-123";

//   useEffect(() => {
//     const fetchChats = async () => {
//       const response = await getAllChats(DUMMY_USER_ID);
//       setChats(response.chats);
//     };
//     fetchChats();
//   }, []);

//   return (
//     <div className="sidebar">
//       <h2>Conversations</h2>
//       <div className="chat-list">
//         {chats.map(chat => (
//           <div
//             key={chat.chatId}
//             className="chat-item"
//             onClick={() => onSelectChat(chat.chatId)}
//           >
//             <div className="chat-icon"></div>
//             <div className="chat-info">
//               <h4>{chat.title}</h4>
//               <p>{chat.last_message}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';

const Sidebar = ({ chats, onSelectChat, onNewChat, activeChatId }) => {
  return (
    <div className="sidebar">
      <h2>Conversations</h2>
      <button className="new-chat-btn" onClick={onNewChat}>+ New Chat</button>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="chat-icon"></div>
            <div className="chat-info">
              <h4>{chat.title}</h4>
              {/* Assuming the last message is available; you might need to adjust based on actual API response */}
              <p>{chat.messages?.slice(-1)[0]?.text || 'No messages yet'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;