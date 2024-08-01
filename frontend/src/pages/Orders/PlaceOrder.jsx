import { useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  

  const placeOrderHandler = async () => {
    try {
      // const res = await createOrder({
      //   orderItems: cart.cartItems,
      //   shippingAddress: cart.shippingAddress,
      //   paymentMethod: cart.paymentMethod,
      //   itemsPrice: cart.itemsPrice,
      //   shippingPrice: cart.shippingPrice,
      //   taxPrice: cart.taxPrice,
      //   totalPrice: cart.totalPrice,
      // }).unwrap();
      // dispatch(clearCartItems());
      // navigate(/order/${res._id});

      await fetch(
        "http://localhost:5173/api/payment?amount=" + cart.totalPrice,

        {
          method: "POST",
          headers: {
            Authorization: "key 83882f53b99f428f81bce74984083c2d",
          },
          body: JSON.stringify({
            return_url: "http://localhost:5173/paysuccess",
            website_url: "https://example.com/",
            // amount: total * 100,
            purchase_order_id: "test12",
            purchase_order_name: "test",
            customer_info: {
              name: "Khalti Bahadur",
              email: "example@gmail.com",
              phone: "9800000123",
            },
            amount_breakdown: [
              {
                label: "Mark Price",
                amount: 1000,
              },
            ],
            product_details: [
              {
                identity: "1234567890",
                name: "Khalti logo",
                total_price: 1300,
                quantity: 1,
                unit_price: 1300,
              },
            ],
            merchant_username: "merchant_name",
            merchant_extra: "merchant_extra",
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => (window.location = data.payment_url));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
    <div className="bg-teal-500 min-h-screen">
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      NPR. {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-teal-500">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> NPR.
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> NPR.
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> NPR.
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> NPR.
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <h3>Khalti</h3>
              {/* <strong>Method:</strong> {cart.paymentMethod} */}
            </div>
          </div>

          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
      </div>
    </>
  );
};

export default PlaceOrder;
