import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userEmail = useSelector((state) => state.auth.email);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      const totalValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalValue);
    };
    calculateTotal();
  }, [cartItems]);

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleSelectAddress = () => {
    navigate('/address');
  };

  const handleOrderHistory = () => {
    navigate('/order-history');
  };

  const handlePlaceOrder = async () => {
    const selectedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
    if (!selectedAddress) {
      alert('Please select an address first.');
      return;
    }

    const order = {
      email: userEmail,
      items: cartItems,
      address: selectedAddress,
      status: 'pending'
    };

    const response = await fetch('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      localStorage.removeItem('cartItems');
      dispatch({ type: 'cart/clearCart' });
      navigate('/order-history');
    } else {
      console.error('Failed to place order');
    }
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addItem({ ...item, quantity: -1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {userEmail && <b><p>Hello {userEmail}</p></b>}
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
            <button onClick={() => handleRemove(item)}>Remove</button>
            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item)}>-</button>
          </div>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={handleSelectAddress}>Select Address</button>
      <button onClick={handlePlaceOrder}>Place Order</button>
      <button onClick={handleOrderHistory}>View Order History</button>
    </div>
  );
};

export default Cart;
