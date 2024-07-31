import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 min-h-screen flex justify-center items-center text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-4 relative overflow-hidden">
        <img
          src="https://source.unsplash.com/1600x900/?technology"
          alt="Technology"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-teal-600 mb-6 animate__animated animate__fadeIn">About Us</h1>
          <p className="text-lg text-gray-800 mb-4 leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
            Welcome to UANA, a modern e-commerce platform dedicated to revolutionizing your online shopping experience. Our platform is designed with you in mind, offering a user-centric interface, secure transactions, and personalized product recommendations.
          </p>
          <p className="text-lg text-gray-800 mb-4 leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
            At UANA, we believe in the power of technology to simplify your life. Our advanced filtering options ensure you find exactly what you’re looking for, and our robust authentication system keeps your data safe.
          </p>
          <p className="text-lg text-gray-800 mb-6 leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
            Our mission is to create an online marketplace that is not only efficient but also enjoyable. Thank you for choosing UANA. We look forward to serving you!
          </p>
          <Link
            to="/shop"
            className="bg-teal-600 text-white font-bold rounded-full py-3 px-8 hover:bg-teal-700 transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
