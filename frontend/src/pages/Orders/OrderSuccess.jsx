// src/pages/OrderSuccess.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const transactionId = query.get("transaction_id");
    const amount = query.get("amount");
    const status = query.get("status");

    if (status !== "Completed") {
      toast.error("Payment failed");
      return;
    }

    // Fetch the order details if needed from the backend
    // For now, we'll just display the parameters
    setOrderDetails({
      transactionId,
      amount,
    });
  }, [location.search]);

  return (
    <div className="bg-teal-500 min-h-screen">
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-semibold mb-4">Order Success</h1>
        {orderDetails ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Thank you for your purchase!</h2>
            <p><strong>Transaction ID:</strong> {orderDetails.transactionId}</p>
            <p><strong>Amount Paid:</strong> NPR. {orderDetails.amount}</p>
            <p>Your payment has been successfully processed. We will send you a confirmation email shortly.</p>
          </div>
        ) : (
          <p>Processing your payment...</p>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
