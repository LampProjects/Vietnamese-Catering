// src/pages/OrderPage.js
import React, { useContext, useState } from 'react';
import { useCart } from '../CartContext';
import { AuthContext } from '../AuthContext';
import './Order.css';

function Order() {
  const { cart, removeFromCart, clearCart } = useCart();
  const auth = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [creditCard, setCreditCard] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!auth.isLoggedIn) {
      setOrderStatus('Please log in to place an order.');
      return;
    }
  
    try {
      const orderData = {
        items: cart,
        total: total,
        customerName,
        customerEmail,
        venueAddress,
        eventDate,
        creditCard: creditCard.slice(-4) // Only send last 4 digits for security
      };
  
      console.log('Sending order data:', orderData);
  
      const response = await fetch('http://localhost:5000/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(orderData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Order response:', data);
        setOrderStatus('Order placed successfully! Order ID: ' + data.orderId);
        clearCart();
        // Clear form fields
        setCustomerName('');
        setCustomerEmail('');
        setVenueAddress('');
        setEventDate('');
        setCreditCard('');
      } else {
        const errorData = await response.json();
        console.error('Order failed:', errorData);
        setOrderStatus('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOrderStatus('An error occurred. Please try again.');
    }
  };
  return (
    <div className="order-container">
      <h2>Your Order</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
          
          <form onSubmit={handleCheckout} className="checkout-form">
            <input
              type="text"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Venue Address"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Credit Card Number"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
              required
            />
            <button type="submit" className="checkout-btn">Place Order</button>
          </form>
          
          {orderStatus && <p className="order-status">{orderStatus}</p>}
        </>
      )}
    </div>
  );
}

export default Order;