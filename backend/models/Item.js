const mongoose = require('mongoose');
const { Schema } = mongoose;
const Restaurant = require('./restaurant'); 

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
    },
    cloudinaryImageId: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    Rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

// Middleware to update restaurant after saving an item
itemSchema.post('save', async function (doc) {
  try {
    // Find the associated restaurant and update its lists array
    const restaurant = await Restaurant.findOneAndUpdate(
      { RestaurantName: doc.parentName },
      {$push: { lists: doc._id },
        $addToSet: { cuisines: doc.category }
      },
      
      { new: true }
    ).exec();

    console.log(`Item added to restaurant: ${restaurant.restaurantName}`);
  } catch (error) {
    console.error('Error updating restaurant:', error);
  }
});

module.exports = mongoose.model('Item', itemSchema);
