import { Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const token = localStorage.getItem("token");
  const dropdownRef = useRef();

  const handleLogOut = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className=" fixed w-full bg-blue-600 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Left side: Logo + Title */}
          <div className="flex items-center gap-4 md:gap-10 text-white">
            <Link to="/">
              <HiMiniBars3CenterLeft className="size-6" />
            </Link>
            <h1 className="text-2xl md:text-4xl font-semibold">BOOKS STORE</h1>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <IoClose size={26} /> : <RxHamburgerMenu size={26} />}
            </button>
          </div>

          {/* Right side (Desktop only) */}
          <div className="hidden md:flex items-center space-x-6 text-white relative">
            {/* Nav Links */}
            <Link to="/" className="hover:underline text-sm md:text-base">Home</Link>
            <Link to="/admin" className="hover:underline text-sm md:text-base">Admin</Link>
            <Link to="/contact" className="hover:underline text-sm md:text-base">Contact</Link>

            {/* Wishlist */}
            <Link to="/wishlist">
              <HiOutlineHeart className="size-6" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1 bg-primary text-white-600 px-3 py-1 rounded hover:bg-primary-100 transition"
            >
              <HiOutlineShoppingCart className="size-5" />
              <span className="text-sm font-semibold">
                {cartItems.length > 0 ? cartItems.length : 0}
              </span>
            </Link>

            {/* Avatar */}
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img
                      src={avatarImg}
                      alt="User"
                      className="w-8 h-8 rounded-full ring-2 ring-white"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                      <ul className="py-2 text-sm text-gray-700">
                        {navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link to={item.href} className="block px-4 py-2 hover:bg-gray-100">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : token ? (
                <Link to="/dashboard" className="text-sm font-medium">Dashboard</Link>
              ) : (
                <Link to="/login">
                  <HiOutlineUser className="size-6" />
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 text-white">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <HiOutlineHeart className="size-5" /> Wishlist
            </Link>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1 rounded w-max">
                <HiOutlineShoppingCart className="size-5" />
                <span className="text-sm font-semibold">
                  {cartItems.length > 0 ? cartItems.length : 0}
                </span>
              </div>
            </Link>

            {/* Avatar Dropdown for Mobile */}
            {currentUser && (
              <div className="bg-white text-gray-800 rounded-md mt-2 p-2 shadow">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
