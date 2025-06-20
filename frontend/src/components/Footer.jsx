import React from 'react';
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side */}
        <div className="w-full md:w-auto text-center md:text-left">
          <img src={footerLogo} alt="Logo" className="mb-4 w-28 mx-auto md:mx-0" />
          <p className="text-base text-gray-300 font-medium">
            © 2025 Books Store. All rights reserved.
          </p>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex gap-6 justify-center md:justify-end">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
