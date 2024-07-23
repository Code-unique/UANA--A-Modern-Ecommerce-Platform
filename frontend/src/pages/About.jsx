import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-teal-500 min-h-screen flex justify-center items-center text-coral">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-4">
        <h1 className="text-4xl font-bold text-teal-600 mb-8">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to UANA, a modern e-commerce platform dedicated to revolutionizing your online shopping experience. Our platform is designed with you in mind, offering a user-centric interface, secure transactions, and personalized product recommendations.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          At UANA, we believe in the power of technology to simplify your life. Our advanced filtering options ensure you find exactly what you’re looking for, and our robust authentication system keeps your data safe.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to create an online marketplace that is not only efficient but also enjoyable. Thank you for choosing UANA. We look forward to serving you!
        </p>
        <Link
          to="/shop"
          className="bg-teal-600 text-white font-bold rounded-full py-2 px-8 hover:bg-teal-700 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
