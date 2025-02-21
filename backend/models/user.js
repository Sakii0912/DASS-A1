const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  seller_reviews: {
    type: String,
    required: false,
  },
  cart: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
      quantity: { type: Number, default: 1 }
    }
  ]
});

//* password hashing function before saving in db
const salt_rounds = 10; //* number of rounds for hashing

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')){
  return next();
  }

  bcrypt.genSalt(salt_rounds, (err, salt) => {
  if (err){
    return next(err);
  }

  bcrypt.hash(user.password, salt, (err, hash) => {
    if (err){
    return next(err);
    }
    user.password = hash;
    next();
  });
  });
});

module.exports = mongoose.model('User', UserSchema);
