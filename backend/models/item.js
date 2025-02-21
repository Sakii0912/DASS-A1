const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    seller_id: {
      type: String,
      required: true,
    },
});

module.exports = mongoose.model("item", ItemSchema);
