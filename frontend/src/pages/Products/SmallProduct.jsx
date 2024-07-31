import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 bg-teal-600 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`} className="text-white">
          <h2 className="flex justify-between items-center text-white font-bold">
            <div>{product.name}</div>
            <span className="bg-teal-800 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
              NPR {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

SmallProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default SmallProduct;
