import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../webpages/Login';
import Register from '../webpages/Register';
import Homepage from '../webpages/homepage/Homepage';
import Profile from '../webpages/Profile';
import PrivateRoutes from './components/PrivateRoutes';
import PrivateSellerRoute from './components/PrivateSellerRoutes';
import AddItem from '../webpages/items/AddItem';
import ItemPage from '../webpages/items/ItemsPage';
import SearchItems from '../webpages/items/SearchItems';
import Cart from '../webpages/Cart';
import OrderHistory from '../webpages/OrderHistory';
import DeliverOrders from '../webpages/DeliverOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        //* test routes
        {/* <Route path="/homepage" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/get_item/:id" element={<ItemPage />} /> */}

        //* final routes after protection of routes

        //* protection of paths behind login page
        <Route path="/homepage" element = {<PrivateRoutes>
          <Homepage />
        </PrivateRoutes>} />
        <Route path="/profile" element = {<PrivateRoutes>
          <Profile />
        </PrivateRoutes>} />
        <Route path="/get_item/:id" element = {<PrivateRoutes>
          <ItemPage />
        </PrivateRoutes>} />
        <Route path="/search" element = {<PrivateRoutes>
          <SearchItems />
        </PrivateRoutes>} />
        <Route path="/cart" element = {<PrivateRoutes>
          <Cart />
        </PrivateRoutes>} />
        //* for making a seller add an item
        <Route path="/add-item" element={<PrivateSellerRoute>
          <AddItem />
        </PrivateSellerRoute>} />
        <Route path="/order_history" element = {<PrivateRoutes>
          <OrderHistory />
        </PrivateRoutes>} />
        <Route path="/order_delivery" element = {<PrivateRoutes>
          <DeliverOrders />
        </PrivateRoutes>} />

      </Routes>
    </Router>
  );
}

export default App;
