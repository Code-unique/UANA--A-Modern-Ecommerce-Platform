
import ChatBot from './ChatBot';
import './ChatBot.css';

const Chat = () => {
  return (
    <div className='bg-teal-500 min-h-screen'>
    <div className="chat-container bg-teal-500 flex justify-center items-center">
      <ChatBot />
    </div>
    </div>
  );
};

export default Chat;
