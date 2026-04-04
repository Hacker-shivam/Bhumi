import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent md:bg-emerald-500 md:shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:py-4">
          
          {/* Logo */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold cursor-pointer text-transparent bg-clip-text 
              bg-gradient-to-r from-lime-100 to-yellow-200 drop-shadow-[0_0_20px_#ECFCCB] 
              animate-pulse">
              Bhumi 🌱
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className='flex gap-8 text-white font-medium'>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/service">SERVICES</Link></li>
              <li><Link to="/recommendation">BHUMI AI</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
            </ul>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-3 text-white">
            {user ? (
              <>
                <span className="text-sm font-semibold">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className='bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className='bg-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-900'>Signup</button>
                </Link>
                <Link to="/login">
                  <button className='bg-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-900'>Login</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="text-white md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          {/* Close button */}
          <button className="text-2xl mb-4" onClick={() => setIsOpen(false)}>✕</button>

          {/* Links */}
          <ul className='flex flex-col gap-5 text-gray-800 font-medium'>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/crop" onClick={() => setIsOpen(false)}>Crop</Link></li>
            <li><Link to="/fertilizer" onClick={() => setIsOpen(false)}>Fertilizer</Link></li>
            <li><Link to="/weather" onClick={() => setIsOpen(false)}>Weather</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          </ul>

          {/* Auth */}
          <div className='flex flex-col gap-3 mt-6'>
            {user ? (
              <>
                <span className="text-sm font-semibold text-gray-700">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className='bg-red-500 px-3 py-2 rounded-lg text-sm text-white hover:bg-red-600'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className='bg-green-800 px-3 py-2 rounded-lg text-sm text-white w-full hover:bg-green-900'>Signup</button>
                </Link>
                <Link to="/login">
                  <button className='bg-green-800 px-3 py-2 rounded-lg text-sm text-white w-full hover:bg-green-900'>Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />}
      
      {/* Spacer to push content below navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;