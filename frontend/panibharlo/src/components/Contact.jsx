// src/components/Contact.jsx
import React, { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ msg: '', error: false, loading: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ msg: '', error: false, loading: true });
    try {
      await api.post('/contact', formData);
      setStatus({ msg: 'Your message has been sent successfully!', error: false, loading: false });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); // Clear form
    } catch (err) {
      const errMsg = err.response?.data?.message || 'An error occurred. Please try again.';
      setStatus({ msg: errMsg, error: true, loading: false });
    }
  };

  return (
    <div className="w-full">
      {/* Page Title */}
     <section
  className="relative text-white py-20 text-center overflow-hidden"
  style={{
    backgroundImage: "url(/assets/images/fgfhh.jpg.avif)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10">
    <h1 className="text-4xl font-bold">Contact Us</h1>
    <ul className="flex justify-center space-x-2 text-gray-200 mt-4">
      <li>
        <a href="/" className="hover:underline">Home</a>
      </li>
      <li>/</li>
      <li>Contact Us</li>
    </ul>
  </div>

  {/* Curved bottom */}
  <svg
    className="absolute bottom-0 left-0 w-full"
    viewBox="0 0 1440 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M0,64 C480,160 960,0 1440,96 L1440,120 L0,120 Z"
    />
  </svg>
</section>



      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-6">
              <li>
                <h5 className="font-bold">Office Location</h5>
                <p className="text-gray-600">629 12th St, Modesto, CA 95354, United States</p>
              </li>
              <li>
                <h5 className="font-bold">Email Drop Us</h5>
                <p className="text-gray-600">
                  <a href="mailto:info@example.com" className="hover:text-blue-500">info@example.com</a>
                  <br />
                  <a href="mailto:information@gmail.com" className="hover:text-blue-500">information@gmail.com</a>
                </p>
              </li>
              <li>
                <h5 className="font-bold">Call for Help</h5>
                <p className="text-gray-600">
                  <a href="tel:11165458856" className="hover:text-blue-500">+(111) 65_458_856</a>
                  <br />
                  <a href="tel:11165458857" className="hover:text-blue-500">+(111) 65_458_857</a>
                </p>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Leave a Comment</h3>
            {status.msg && (
              <div className={`mb-4 p-3 rounded-lg text-center ${status.error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {status.msg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" name="name" placeholder="Your Name" required
                  value={formData.name} onChange={handleChange}
                  className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                  type="email" name="email" placeholder="Email Address" required
                  value={formData.email} onChange={handleChange}
                  className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                  type="text" name="phone" placeholder="Phone Number"
                  value={formData.phone} onChange={handleChange}
                  className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                  type="text" name="subject" placeholder="Subject" required
                  value={formData.subject} onChange={handleChange}
                  className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <textarea 
                name="message" placeholder="Leave a Comment" rows="5" required
                value={formData.message} onChange={handleChange}
                className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button 
                type="submit" 
                disabled={status.loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition disabled:bg-gray-400"
              >
                {status.loading ? 'Submitting...' : 'Submit Now'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.993465304189!2d-74.005974!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
          className="w-full h-96 border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
