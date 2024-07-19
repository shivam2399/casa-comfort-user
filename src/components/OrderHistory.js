import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json');
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        const data = await response.json();
        const userOrders = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(order => order.email === userEmail);
          
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.id} className="order-item">
            <p><span>Order ID:</span> {order.id}</p>
            <p><span>Items:</span> {order.items.map(item => item.name).join(', ')}</p>
            <p><span>Address:</span> {order.address}</p>
            <p><span>Status:</span> {order.status}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
