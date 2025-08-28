import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      {/* Footer top */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">
              Please <span className="text-blue-500">Call Us</span> to Take an Extraordinary Service
            </h2>
          </div>
          <div className="text-center md:text-right">
            <a href="tel:7732253523" className="inline-flex items-center text-lg hover:text-blue-500">
              <i className="fas fa-phone mr-2"></i>(773) 225-3523
            </a>
          </div>
        </div>

        {/* Footer logo */}
        <div className="footer-logo text-center mb-10">
          <img src="/assets/images/footer/footer.png" alt="Footer Logo" className="mx-auto w-32" />
        </div>

        {/* Widget section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-10">
          {/* Address */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Address</h4>
            <ul>
              <li>Flat 20, Reynolds Neck, FV77 8WS</li>
              <li>Call Us: <a href="tel:3336660001" className="hover:text-blue-500">333-666-0001</a></li>
              <li><a href="mailto:info@example.com" className="hover:text-blue-500">info@example.com</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Links</h4>
            <ul>
              <li><a href="#" className="hover:text-blue-500">About Company</a></li>
              <li><a href="#" className="hover:text-blue-500">Services</a></li>
              <li><a href="#" className="hover:text-blue-500">Our Blog</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact Us</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Subscribe</h4>
            <form className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="p-2 rounded text-gray-900 flex-1"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white flex items-center justify-center"
              >
                <i className="far fa-long-arrow-alt-right"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p>© {new Date().getFullYear()} Acuasafe. All rights reserved.</p>
          <ul className="flex space-x-4 mt-4 md:mt-0 justify-center md:justify-end">
            <li><a href="#" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#" className="hover:text-blue-500"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="hover:text-blue-500"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
