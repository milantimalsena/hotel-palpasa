import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react';
import logo from '@/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-brown-dark text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full overflow-hidden">
                <img
                  src={logo}
                  alt="Hotel Palpasa logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[12px] font-bold tracking-[0.2em] text-palpasa-blue uppercase">Hotel</span>
                <span className="text-2xl font-serif font-bold text-palpasa-green uppercase tracking-tight">Palpasa</span>
              </div>
            </Link>
            <p className="text-cream/70 leading-relaxed">
              Experience the finest dining in Itahari. We blend traditional hospitality with modern culinary excellence to create unforgettable moments.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/hotelpalpasa" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/menu" className="hover:text-gold transition-colors">Our Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Reservations</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-6 text-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-gold shrink-0" size={20} />
                <span className="text-cream/70">Itahari-6, Sunsari, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-gold shrink-0" size={20} />
                <span className="text-cream/70">+977 98XXXXXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-gold shrink-0" size={20} />
                <span className="text-cream/70">info@hotelpalpasa.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-6 text-gold">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Clock className="text-gold shrink-0" size={20} />
                <div>
                  <p className="font-medium">Mon - Sun</p>
                  <p className="text-cream/70 text-sm">08:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="pt-4">
                <p className="text-sm text-gold italic">Available for private parties and events.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center text-sm text-cream/50">
          <p>&copy; {new Date().getFullYear()} Hotel Palpasa. All rights reserved. Designed for excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
