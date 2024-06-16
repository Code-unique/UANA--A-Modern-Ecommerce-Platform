import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

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
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden ml-[2rem] p-3 relative">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-3 right-3 bg-teal-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
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

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-coral dark:text-white">{product?.name}</h5>
          <p className="text-green-40000 font-semibold">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "NPR",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {product?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
            className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
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

export default Product;
