const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  //* buyer and seller id are iiith mail ids
  buyerEmail: { type: String, required: true },
  sellerEmails: [{ type: String, required: true }],
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
      name: String,
      sellerEmail: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  hashedOTP: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', OrderSchema);
