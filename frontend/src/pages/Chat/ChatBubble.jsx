import PropTypes from 'prop-types';
import './ChatBubble.css'; // Create ChatBubble.css for styling

const ChatBubble = ({ onClick }) => {
  return (
    <div className="chat-bubble" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.05 1.41 5.77 3.61 7.55l-.19.45 1.69-.71L8 21l-.71-1.71 1.69.71-.19-.45C10.37 19.77 11.63 20 12 20c5.52 0 10-4.48 10-10S17.52 2 12 2zm-2 15l-3-3h2V9h2v5h2l-3 3z"/>
      </svg>
    </div>
  );
};

ChatBubble.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ChatBubble;
