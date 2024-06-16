import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);

    // Simulate a bot response
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);

    setUserInput('');
  };

  const getBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('hello')) {
      return 'Hi there! How can I assist you today?';
    } else if (lowercaseInput.includes('price')) {
      return 'You can find the prices on the product page.';
    } else if (lowercaseInput.includes('shipping')) {
      return 'We offer free shipping on orders over $50.';
    } else if (lowercaseInput.includes('help')) {
      return 'Sure! What do you need help with?';
    } else if (lowercaseInput.includes('bye')) {
      return 'Goodbye! Have a great day!';
    } else {
      return 'Sorry, I did not understand that. Can you please rephrase?';
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <span className="chat-support-text">Chat Support</span>
        <div className="chatbot-close-btn" onClick={onClose}>×</div>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
