// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import axios from "axios";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recommendationRoutes from './routes/recommendationRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route definitions
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Khalti payment integration
app.post("/api/payment", async (req, response, next) => {
  try {
    const res = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/paysuccess",
        website_url: "https://example.com/",
        amount: parseInt(req.query.amount),
        purchase_order_id: "test12",
        purchase_order_name: "test",
        customer_info: {
          name: "Khalti Bahadur",
          email: "example@gmail.com",
          phone: "9800000123",
        },
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
      },
      {
        headers: {
          Authorization: "key 83882f53b99f428f81bce74984083c2d",
          "Content-type": "application/json",
        },
      }
    );

    console.log(res.data);
    console.log(res.status);
    return response.json(res.data);
  } catch (error) {
    console.error('Error during payment process:', error.message);
    return response.status(500).json({ message: 'Error during payment process' });
  }
});

// PayPal config
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Static file serving
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
