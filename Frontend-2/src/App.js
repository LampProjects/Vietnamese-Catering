// App.js
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderPage from './Order/Order';
import BanhMiCatering from './Home/Home';
import ContactPage from './Contact/ContactPage';
import LoginPage from './Login/Login';
import Menu from './Menu/Menu';
import Header from './Components/Header';
import RegisterPage from './Register/Register';
import ProfilePage from './Profile/Profile';
import './common.css';
import { AuthContext } from './AuthContext';
import { CartProvider } from './CartContext';

function App() {
  const [token, setToken] = useState(null);

  const login = useCallback((newToken) => {
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const routes = (
    <div className="page-wrapper">
      <div className="content-container">
        <Header isLoggedIn={!!token} onLogout={logout} />
        <Routes>
          <Route path="/" element={<BanhMiCatering />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login: login,
        token: token,
        logout: logout
      }}
    >
      <Router>
        {token ? (
          <CartProvider>
            <main>{routes}</main>
          </CartProvider>
        ) : (
          <main>{routes}</main>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;