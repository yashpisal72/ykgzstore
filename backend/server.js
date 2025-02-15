const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: "rzp_test_05D26MnOuEaTcA", // Your Razorpay Test Key
    key_secret: "AERahm87h3oWY25Mfa3HwIdN" // Your Razorpay Secret Key
});

// API to Create Razorpay Order
app.post("/create-order", async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert amount to paisa
            currency: currency,
            payment_capture: 1
        });

        res.json({ orderId: order.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
