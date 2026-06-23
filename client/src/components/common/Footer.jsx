import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">⚡</span>
              <span className="text-2xl font-bold text-white">
                QuickKart<span className="text-green-500">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's fastest AI-powered grocery delivery. Fresh products delivered in minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-white transition">Home</Link>
              <Link to="/products" className="block hover:text-white transition">Shop</Link>
              <Link to="/ai" className="block hover:text-white transition">AI Assistant</Link>
              <Link to="/orders" className="block hover:text-white transition">My Orders</Link>
              <Link to="/wishlist" className="block hover:text-white transition">Wishlist</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <div className="space-y-2 text-sm">
              <Link to="/?category=fruits" className="block hover:text-white transition">Fruits & Vegetables</Link>
              <Link to="/?category=dairy" className="block hover:text-white transition">Dairy & Eggs</Link>
              <Link to="/?category=grains" className="block hover:text-white transition">Rice, Dal & Grains</Link>
              <Link to="/?category=snacks" className="block hover:text-white transition">Snacks & Beverages</Link>
              <Link to="/?category=household" className="block hover:text-white transition">Household Items</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white transition">Contact Us</a>
              <a href="#" className="block hover:text-white transition">Track Your Order</a>
              <a href="#" className="block hover:text-white transition">FAQs</a>
              <a href="#" className="block hover:text-white transition">Return Policy</a>
              <a href="#" className="block hover:text-white transition">Terms & Conditions</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-gray-500">
            © 2026 QuickKart AI. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white transition">📘</a>
            <a href="#" className="hover:text-white transition">🐦</a>
            <a href="#" className="hover:text-white transition">📷</a>
          </div>
        </div>
      </div>
    </footer>
  );
}