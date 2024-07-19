import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import AddressForm from './components/AddressForm';
import Auth from './components/Auth';
import OrderHistory from './components/OrderHistory';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Auth /> },
  { path: '/home', element: <Home /> },
  { path: '/product/:productId', element: <ProductDetails /> },
  { path: '/cart', element: <Cart /> },
  { path: '/address', element: <AddressForm /> },
  { path: '/order-history', element: <OrderHistory /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
