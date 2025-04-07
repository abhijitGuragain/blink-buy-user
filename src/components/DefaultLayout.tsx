import React, { useState } from 'react';
import Login from './modal/Login'; // Adjust the import path

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  const user = {
    isLoggedIn: false, // Toggle this to test logged-in/logged-out states
    firstName: 'John',
    lastName: 'Doe',
  };

  const handleOpenLogin = () => {
    setShow(true);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="navbar bg-base-200 shadow-sm fixed top-0 w-full z-50">
        {/* Mobile Menu Button */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><a href="/products">Products</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/deals">Deals</a></li>
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-3xl font-bold">
            <span>
              Blink<span className='text-primary'>Buy</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/products" className="text-lg">Products</a></li>
            <li><a href="/categories" className="text-lg">Categories</a></li>
            <li><a href="/deals" className="text-lg">Deals</a></li>
          </ul>
        </div>

        {/* Right Side - Cart & Profile */}
        <div className="navbar-end gap-2">
          <div className="form-control hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-40 md:w-64"
            />
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-64 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View Cart</button>
                  <button className="btn btn-outline btn-block">Checkout</button>
                </div>
              </div>
            </div>
          </div>

          {user.isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="rounded-full p-2 flex items-center justify-center bg-primary text-primary-content font-bold">
                  <span>{getInitials(user.firstName, user.lastName)}</span>

                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {user.isLoggedIn && (
                  <>
                    <li>
                      <a href="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a href="/orders">Orders</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                  </>
                )}
              </ul>
            </div>) : (
            < span onClick={handleOpenLogin} className='cursor-pointer mr-4'>Login</span>
          )}
        </div>
      </nav >

      {/* Render Login Modal */}
      {show && <Login show={show} setShow={setShow} />}

      <main className="pt-20 flex-grow flex justify-center items-center flex-col">{children}</main>

      <footer className="footer bg-base-200 text-base-content p-10 mt-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="footer-title text-lg font-bold">BlinkBuy</h2>
            <p className="mt-2">Your one-stop shop for everything you need, delivered in a blink!</p>
          </div>
          <div>
            <h2 className="footer-title">Shop</h2>
            <ul className="space-y-2">
              <li><a href="/products" className="link link-hover">Products</a></li>
              <li><a href="/categories" className="link link-hover">Categories</a></li>
              <li><a href="/deals" className="link link-hover">Deals</a></li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Support</h2>
            <ul className="space-y-2">
              <li><a href="/faq" className="link link-hover">FAQ</a></li>
              <li><a href="/about-us" className="link link-hover">About Us</a></li>
              <li><a href="/contact" className="link link-hover">Contact Us</a></li>
              <li><a href="/returns" className="link link-hover">Returns</a></li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Get in Touch</h2>
            <p>Email: <a href="mailto:support@blinkbuy.com" className="link link-hover">support@blinkbuy.com</a></p>
            <p>Phone: <span>+1 (800) 555-1234</span></p>
            <div className="mt-4 flex gap-4">
              <a href="https://twitter.com" className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.6a9.9 9.9 0 01-2.8.8 4.9 4.9 0 002.2-2.7 9.8 9.8 0 01-3.1 1.2 4.9 4.9 0 00-8.4 4.5A13.9 13.9 0 011.7 3.6a4.9 4.9 0 001.5 6.6A4.9 4.9 0 01.9 9.6v.1a4.9 4.9 0 003.9 4.8 4.9 4.9 0 01-2.2.1 4.9 4.9 0 004.6 3.4A9.8 9.8 0 010 21.5a13.9 13.9 0 007.5 2.2c9 0 14-7.5 14-14v-.6A9.9 9.9 0 0024 4.6z" />
                </svg>
              </a>
              <a href="https://facebook.com" className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.4C0 23.4.6 24 1.3 24H12.8v-9.3H9.7v-3.6h3.1V8.4c0-3.1 1.9-4.8 4.7-4.8 1.3 0 2.5.2 2.5.2v2.8h-1.7c-1.3 0-1.6.6-1.6 1.6v2.1h3.2l-.4 3.6h-2.8V24h5.5c.7 0 1.3-.6 1.3-1.3V1.3C24 .6 23.4 0 22.7 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center mt-8 border-t border-base-300 pt-4">
          <p>© {new Date().getFullYear()} BlinkBuy. All rights reserved.</p>
        </div>
      </footer>
    </div >
  );
};

export default DefaultLayout;