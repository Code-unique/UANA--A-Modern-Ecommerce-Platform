import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Gifts.css';

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const userId = localStorage.getItem('userId'); // Fetch userId from localStorage

  // Function to save user interactions
  const saveUserInteraction = useCallback(async (productId, actionType) => {
    try {
      await axios.post('/api/interaction', {
        userId,
        productId,
        rating: null, // Optional, set if needed
        vector: null, // Optional, set if needed
        actionType,
      });
    } catch (error) {
      console.error('Error saving interaction:', error.message);
    }
  }, [userId]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (Array.isArray(response.data)) {
          setGifts(response.data);
        } else if (response.data.products && Array.isArray(response.data.products)) {
          setGifts(response.data.products);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        setError('Error fetching gifts: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    const fetchRecommendations = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`/api/recommendations/${userId}`);
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        setError('Error fetching recommendations: ' + error.message);
      }
    };

    fetchGifts();
    fetchRecommendations(); // Fetch recommendations after fetching gifts
  }, [userId, saveUserInteraction]);

  useEffect(() => {
    // Save interactions when gifts are viewed
    gifts.forEach((gift) => saveUserInteraction(gift._id, 'view'));
  }, [gifts, saveUserInteraction]);

  const handleGiftClick = (gift) => {
    saveUserInteraction(gift._id, 'click');
    setSelectedGift(gift);
  };

  const handleClose = () => {
    setSelectedGift(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-teal-500 min-h-screen text-coral-600">
      <header className="py-8 text-center">
        <h1 className="text-5xl font-bold">Gift Recommendations</h1>
        <p className="mt-4 text-lg">Find the perfect gift for your loved ones!</p>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <motion.div
              key={gift._id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleGiftClick(gift)}
            >
              <img
                src={gift.image}
                alt={gift.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{gift.name}</h2>
            </motion.div>
          ))}
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec._id}
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleGiftClick(rec)}
                >
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{rec.name}</h2>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
      {selectedGift && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <button
              className="absolute top-4 right-4 text-coral-600 text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedGift.name}</h2>
            <img
              src={selectedGift.image}
              alt={selectedGift.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            {/* If your gifts have a video field, include the video element */}
            {selectedGift.video && (
              <video
                src={selectedGift.video}
                controls
                className="w-full rounded-md"
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gifts;
