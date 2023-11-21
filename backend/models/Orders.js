const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    type: Array,
    required: true,
  }, // Array of products
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
