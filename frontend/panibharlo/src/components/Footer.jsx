import React from "react";
import { Link } from "react-router-dom";
import { 
  FaPhone, FaMapMarkerAlt, FaEnvelopeOpenText, 
  FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaLongArrowAltRight 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="main-footer relative text-white">
      {/* Upper Footer (Gradient Full Width) */}
      <div className="w-full bg-gradient-to-t from-blue-400 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Footer Top */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-blue-700 pb-6 mb-8">
            <h2 className="text-2xl font-bold text-center md:text-left">
              Please <span className="text-cyan-400">Call Us</span> to Take an Extraordinary Service
            </h2>
            <a
              href="tel:7732253523"
              className="mt-4 md:mt-0 inline-flex items-center text-lg text-white bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600"
            >
              <FaPhone className="mr-2" /> (773) 225-3523
            </a>
          </div>

          {/* Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Widget */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14">
                  <img
                    src="/assets/images/watersplash.jpg.PNG"
                    alt="PaniBharlo Logo"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    PaniBharlo
                  </span>
                  <div className="text-xs text-cyan-200 font-medium -mt-1">
                    Pure Water Delivery
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                Panibharlo is your trusted partner for premium water delivery services.
              </p>
              <div>
                <h6 className="font-bold mb-2">Open Hours:</h6>
                <ul className="text-gray-400 space-y-1">
                  <li>Mon - Sat: 9AM - 6PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-xl font-bold mb-4">Address</h4>
              <ul className="text-gray-300 space-y-2">
                <li><FaMapMarkerAlt className="inline mr-2" /> Flat 20, Reynolds Neck, FV77 8WS</li>
                <li><FaPhone className="inline mr-2" /> Call Us: <a href="tel:3336660001">333-666-0001</a></li>
                <li><FaEnvelopeOpenText className="inline mr-2" /> <a href="mailto:info@example.com">info@example.com</a></li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xl font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/">About Company</Link></li>
                <li><Link to="/">Services</Link></li>
                <li><Link to="/">How It Works</Link></li>
                <li><Link to="/">Our Blog</Link></li>
                <li><Link to="/">Contact Us</Link></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h4 className="text-xl font-bold mb-4">Subscribe</h4>
              <p className="text-gray-300 mb-4">
                Panibharlo is your trusted partner for premium water delivery services.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 rounded-l-lg text-black focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 px-4 rounded-r-lg hover:bg-cyan-600 flex items-center justify-center"
                >
                  <FaLongArrowAltRight className="text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom (Solid Dark Blue) */}
      <div className="bg-blue-900 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-300 space-y-2 md:space-y-0">
          <p>
            <Link to="/">PaniBharlo</Link> © {new Date().getFullYear()} All Rights Reserved
          </p>

          {/* Social Icons */}
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-white border border-gray-300 hover:bg-blue-500 transition-all"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-white border border-gray-300 hover:bg-blue-500 transition-all"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-white border border-gray-300 hover:bg-blue-500 transition-all"
              >
                <FaGooglePlusG />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-white border border-gray-300 hover:bg-blue-500 transition-all"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>

          {/* Terms & Privacy */}
          <ul className="flex space-x-4">
            <li><Link to="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
