import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="bg-teal-600 w-full h-full flex flex-col items-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <Link
            to="/"
            className="text-teal-200 font-semibold hover:underline mb-4 block"
          >
            Go Back
          </Link>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.message}
            </Message>
          ) : (
            <>
              <div className="flex flex-wrap relative items-start mt-4 bg-teal-600 rounded-lg shadow-lg p-4">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] rounded-lg"
                  />
                  <HeartIcon product={product} />
                </div>

                <div className="flex flex-col flex-grow pl-4">
                  <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
                  <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-teal-200">
                    {product.description}
                  </p>

                  <p className="text-5xl my-4 font-extrabold text-teal-100">
                    NPR {product.price}
                  </p>

                  <div className="flex items-center justify-between w-full">
                    <div className="one text-teal-100">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2" /> Brand: {product.brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[20rem]">
                        <FaClock className="mr-2" /> Added: {moment(product.createAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2" /> Reviews: {product.numReviews}
                      </h1>
                    </div>

                    <div className="two text-teal-100">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2" /> Ratings: {rating}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaBox className="mr-2" /> In Stock: {product.countInStock}
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-between flex-wrap mt-4">
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />

                    {product.countInStock > 0 && (
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="p-2 w-[6rem] rounded-lg text-black"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="btn-container mt-4">
                    <button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      className="bg-teal-500 text-white py-2 px-4 rounded-lg mt-4"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 container flex flex-wrap items-start justify-between">
                <ProductTabs
                  loadingProductReview={loadingProductReview}
                  userInfo={userInfo}
                  submitHandler={submitHandler}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  product={product}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
