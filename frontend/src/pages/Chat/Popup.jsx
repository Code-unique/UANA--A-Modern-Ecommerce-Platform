import { useState } from 'react';
import ChatBot from './ChatBot';

const Popup = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleToggleChatBot = () => {
    setShowChatBot(prev => !prev);
  };

  return (
    <div className="popup-container">
      <button onClick={handleToggleChatBot}>Open Chat</button>
      {showChatBot && <ChatBot onClose={handleToggleChatBot} />}
    </div>
  );
};

export default Popup;
