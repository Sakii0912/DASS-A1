const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user_routes = require('./routes/user_routes.js');
const item_routes = require('./routes/item_routes.js');
const order_routes = require('./routes/order_routes.js');
const cart_routes = require('./routes/cart_routes.js');
const cors = require('cors');

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());
app.options('*', cors())

app.use('/api/user_routes', user_routes);
app.use('/api/item_routes', item_routes);
app.use('/api/order_routes', order_routes);
app.use('/api/cart_routes', cart_routes);

app.get('/', (req, res) => {
    res.send('Backend server successfully running');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
