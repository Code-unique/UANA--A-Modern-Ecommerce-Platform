import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-teal-600 w-full h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-white text-center mt-8">
            Your cart is empty. <Link to="/shop" className="text-teal-200 underline">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold mb-4 text-white">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4 p-2 bg-teal-700 rounded-lg">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-teal-200">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-teal-100">{item.brand}</div>
                    <div className="mt-2 text-teal-100 font-bold">
                      NPR {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-4 bg-teal-700 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <div className="text-2xl font-bold text-white">
                  NPR{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>

                <button
                  className="bg-teal-500 mt-4 py-2 px-4 rounded-full text-lg text-white w-full"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
