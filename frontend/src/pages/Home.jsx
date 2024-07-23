import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header';
import Product from './Products/Product';
import ChatBot from './chat/ChatBot'; // Assuming this is your ChatBot component
import ChatBubble from './chat/ChatBubble'; // Assuming this is your ChatBubble component

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // State to manage the visibility of the chat popup
  const [showChat, setShowChat] = useState(false);

  // Function to toggle the chat popup visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="bg-teal-500 min-h-screen relative overflow-hidden">
      {!keyword && <Header />}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-white mb-8">
                Special Products
              </h1>
              <Link
                to="/shop"
                className="bg-green-600 text-white font-bold rounded-full py-2 px-8"
              >
                Shop
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ChatBubble component to trigger the popup */}
      <ChatBubble onClick={toggleChat} />

      {/* ChatBot component as a compact popup */}
      {showChat && (
        <div className="absolute bottom-4 right-4 md:right-8 z-50">
          <div className="bg-teal-600 text-white rounded-lg shadow-lg overflow-hidden">
            <ChatBot />
            <button
              className="w-full bg-teal-500 text-white py-2"
              onClick={toggleChat}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
