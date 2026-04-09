cd backend
npm init -y
npm install express razorpay crypto cors dotenv

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 Create Order
app.post('/create-order', async (req, res) => {
  const { plan } = req.body;

  const amount = plan === 'starter' ? 800000 : 1300000;

  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: 'receipt_' + Date.now(),
  });

  res.json(order);
});

// 🔹 Verify Payment
app.post('/verify-payment', (req, res) => {
  const { paymentId, orderId, signature, plan, email } = req.body;

  const body = orderId + "|" + paymentId;

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected !== signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // ✅ Payment verified
  console.log("Payment verified:", paymentId, plan, email);

  res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on port 5000'));
