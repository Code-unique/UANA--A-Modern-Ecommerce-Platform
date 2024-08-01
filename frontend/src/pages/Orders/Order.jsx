import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDeliverOrderMutation, useGetOrderDetailsQuery } from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!order) return;
    if (!order.isPaid) {
      // You may need to adjust the logic depending on your Khalti integration
      // For now, this code block is just a placeholder
    }
  }, [order]);

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  const placeOrderHandler = async () => {
    try {
      await fetch(
        "http://localhost:5173/api/payment?amount=" + order.totalPrice,
        {
          method: "POST",
          headers: {
            Authorization: "key YOUR_KHALTI_SECRET_KEY",
          },
          body: JSON.stringify({
            return_url: "http://localhost:5173/paysuccess",
            website_url: "https://example.com/",
            purchase_order_id: order._id,
            purchase_order_name: "Order Payment",
            customer_info: {
              name: order.user.username,
              email: order.user.email,
              phone: order.user.phone,
            },
            amount_breakdown: [
              {
                label: "Order Total",
                amount: order.totalPrice * 100,
              },
            ],
            product_details: [
              {
                identity: order._id,
                name: "Order Payment",
                total_price: order.totalPrice * 100,
                quantity: 1,
                unit_price: order.totalPrice * 100,
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
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-teal-500 min-h-screen flex justify-end">
      <div className="container flex flex-col md:flex-row ml-auto mr-10">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <>
            <div className="md:w-2/3 pr-4">
              <div className="border gray-300 mt-5 pb-4 mb-5">
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-80%">
                      <thead className="border-b-2">
                        <tr>
                          <th className="p-2">Image</th>
                          <th className="p-2">Product</th>
                          <th className="p-2 text-center">Quantity</th>
                          <th className="p-2">Unit Price</th>
                          <th className="p-2">Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {order.orderItems.map((item, index) => (
                          <tr key={index}>
                            <td className="p-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover"
                              />
                            </td>

                            <td className="p-2">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </td>

                            <td className="p-2 text-center">{item.qty}</td>
                            <td className="p-2 text-center">{item.price}</td>
                            <td className="p-2 text-center">
                              NPR. {(item.qty * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="mt-5 border-gray-300 pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2 text-white">Shipping</h2>
                <p className="mb-4 mt-4">
                  <strong className="text-green-300">Order:</strong> {order._id}
                </p>

                <p className="mb-4">
                  <strong className="text-green-300">Name:</strong>{" "}
                  {order.user.username}
                </p>

                <p className="mb-4">
                  <strong className="text-green-300">Email:</strong>{" "}
                  {order.user.email}
                </p>

                <p className="mb-4">
                  <strong className="text-green-300">Address:</strong>{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>

                <p className="mb-4">
                  <strong className="text-green-300">Method:</strong>{" "}
                  {order.paymentMethod}
                </p>

                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
              </div>

              <h2 className="text-xl font-bold mb-2 mt-[3rem] text-white">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2 text-white">
                <span>Items</span>
                <span>NPR. {order.itemsPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-white">
                <span>Shipping</span>
                <span>NPR. {order.shippingPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-white">
                <span>Tax</span>
                <span>NPR. {order.taxPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-white">
                <span>Total</span>
                <span>NPR. {order.totalPrice}</span>
              </div>

              {!order.isPaid && (
                <div>
                  {loadingDeliver && <Loader />}
                  <button
                    type="button"
                    className="bg-green-500 text-white w-full py-2"
                    onClick={placeOrderHandler}
                  >
                    Pay with Khalti
                  </button>
                </div>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <div>
                    <button
                      type="button"
                      className="bg-green-500 text-white w-full py-2"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
