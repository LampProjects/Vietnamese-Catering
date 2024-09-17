// Gets the Past orders that somebody might have and returns if it is empty or not
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './Profile.css';

function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user-orders', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth.isLoggedIn) {
      fetchOrders();
    }
  }, [auth.isLoggedIn, auth.token]);

  if (!auth.isLoggedIn) {
    return <div className="profile-container">Please log in to view your profile.</div>;
  }

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <h3>Past Orders</h3>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <p>Order ID: {order._id}</p>
              <p>Customer Name: {order.customerName}</p>
              <p>Customer Email: {order.customerEmail}</p>
              <p>Date of Order: {new Date(order.date).toLocaleDateString()}</p>
              <p>Date of Event: {new Date(order.eventDate).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              
              <ul className="item-list">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage;