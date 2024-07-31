import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import HeartIcon from './HeartIcon';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    try {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to add item", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-[20rem] ml-[2rem] p-3 bg-teal-600 text-white rounded-lg shadow-md">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-3 right-3 bg-teal-800 text-teal-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {product?.brand}
          </span>
          <img
            className="cursor-pointer w-full h-48 object-cover rounded-t-lg"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <HeartIcon product={product} />
      </section>

      <div className="p-4">
        <div className="flex justify-between">
          <h5 className="text-xl font-bold text-black">{product?.name}</h5>
          <p className="text-teal-300 font-semibold">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "NPR",
            })}
          </p>
        </div>

        <p className="mb-3 text-teal-200">
          {product?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-teal-900 bg-teal-400 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white"
            onClick={() => addToCartHandler(product, 1)}
            aria-label="Add to Cart"
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
