require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')(process.env.stripe);
const MongoDb = require('./db');
const Order = require('./models/Orders');
// const User=require("./models/user");
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello from india');
});
MongoDb();
app.use('/api/auth', require('./routes/CreateData'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api',require('./routes/OrderData'));
app.use('/api/',require('./routes/Restaurant'));
app.use('/api',require('./routes/ItemData'));
const port = process.env.PORT || 6000;

// Connect to MongoDB


// Create a route for creating a checkout session
app.post('/api/create-checkout-session', async (req, res) => {
    res.send("hellp");
  try {

    const { products, email } = req.body;
    console.log(products);
    let eId = await Order.findOne({ 'email': email });
    
    console.log("f");

    const paymentMethods = [
      'card',
  
    ];
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      line_items: products.map((product) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.Name,
            images: ["https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" + product.imageId],
            description: product.description,
          },
          unit_amount: product.price, // Stripe requires amount in cents
        },
        quantity: product.qty,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: { orderId: eId ? eId._id.toString() : '' },
    });
    await products.splice(0,0,{Order_date: new Date()})
    // If no existing order is found, create a new one
    if (!eId) {
      try {
        await Order.create({
          email: email,
          products:[products], // Store the product details in the database
          
        });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error', error: error.message });
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: email },
          { $push: { products: products } } // Push the products into the existing order
        );
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error', error: error.message });
      }
    }

    // Return the session ID to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
