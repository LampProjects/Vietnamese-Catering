import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';

const NavItem = ({ to, children, onClick }) => (
  <Link to={to} className="nav-item" onClick={onClick}>{children}</Link>
);

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const navItems = isLoggedIn
    ? [
        { label: "Home", path: "/"},  
        { label: "Menu", path: "/menu" },
        { label: "Order", path: "/order" },
        { label: "Profile", path: "/profile" },
        { label: "Contact", path: "/contact" },
        { label: "Logout", path: "#", onClick: handleLogout }
      ]
    : [
        { label: "Home", path: "/"},
        { label: "Menu", path: "/menu" },
        { label: "Contact", path: "/contact" },
        { label: "Login", path: "/login" }
      ];

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <h1 className="logo">Banh Mi</h1>
      </div>
      <nav className="nav">
        {navItems.map((item, index) => (
          <NavItem key={index} to={item.path} onClick={item.onClick}>{item.label}</NavItem>
        ))}
      </nav>
    </header>
  );
};

export default Header;
