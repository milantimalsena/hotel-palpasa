import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, Utensils, Coffee, Users, MapPin, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'AC Rooms', description: 'Enjoy your meal in climate-controlled comfort.' },
    { icon: <Utensils className="w-6 h-6" />, title: 'Balcony Dining', description: 'Dine with a view on our beautiful open-air balcony.' },
    { icon: <Users className="w-6 h-6" />, title: 'Private Cabins', description: 'Soundproof cabins for your private parties and meetings.' },
    { icon: <Car className="w-6 h-6" />, title: 'Free Parking', description: 'Spacious and secure parking for all our guests.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
            alt="Restaurant Ambience" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-palpasa-pink/20 backdrop-blur-md border border-palpasa-pink/30 px-4 py-1 rounded-full mb-6">
              <Star className="w-4 h-4 text-palpasa-pink fill-palpasa-pink" />
              <span className="text-palpasa-pink text-sm font-medium tracking-wider uppercase">4.8/5 Rated Excellence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Experience Premium <br />
              <span className="text-palpasa-orange">Dining in Itahari</span>
            </h1>
            <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover a world of exquisite flavors, cozy ambiance, and unparalleled hospitality at Hotel Palpasa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="luxury-button text-lg px-8 py-6">
                <Link to="/contact">Reserve a Table</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-palpasa-green rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-palpasa-orange mx-auto mb-6"></div>
            <p className="text-brown-dark/70 max-w-2xl mx-auto">
              We provide more than just food; we provide an experience tailored to your comfort and taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-palpasa-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 text-palpasa-blue">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                <p className="text-brown-dark/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" 
                  alt="Chef at work" 
                  className="rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/10 rounded-full -z-0 blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-brown-dark/5 rounded-full -z-0 blur-2xl"></div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-palpasa-pink font-medium tracking-widest uppercase text-sm mb-4 block">Our Story</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  Crafting Culinary <br /> Masterpieces Since 2020
                </h2>
                <p className="text-brown-dark/70 mb-8 leading-relaxed">
                  At Hotel Palpasa, we believe that every meal is a celebration. Our chefs use only the freshest local ingredients to create dishes that are as beautiful as they are delicious. Whether you're here for a quick coffee or a grand family dinner, we ensure every moment is special.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-palpasa-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-palpasa-green rounded-full"></div>
                    </div>
                    <span className="font-medium">Award-winning local & international cuisine</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-palpasa-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-palpasa-green rounded-full"></div>
                    </div>
                    <span className="font-medium">Warm and trendy ambiance for all occasions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-palpasa-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-palpasa-green rounded-full"></div>
                    </div>
                    <span className="font-medium">Exceptional hospitality that makes you feel at home</span>
                  </li>
                </ul>
                <Button asChild className="luxury-button px-8">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-palpasa-blue font-medium tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What Our Guests Say</h2>
            <div className="w-24 h-1 bg-palpasa-orange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Suman Thapa", rating: 5, text: "The best dining experience in Itahari! The private cabins are perfect for family gatherings. The food quality is consistently excellent." },
              { name: "Priya Sharma", rating: 5, text: "Love the balcony dining! The ambiance is so trendy and cozy. Their Butter Chicken is a must-try. Great hospitality!" },
              { name: "Anish Rai", rating: 4, text: "Great place for quick bites and coffee. The free parking is a huge plus. Highly recommend their Palpasa Special Thali." }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card p-8 relative"
              >
                <div className="flex text-palpasa-orange mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "fill-palpasa-orange" : "text-palpasa-orange/20"} />
                  ))}
                </div>
                <p className="text-brown-dark/70 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-palpasa-blue rounded-full flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-serif font-bold">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brown-dark text-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
            alt="Pattern" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Ready to Taste the Best?</h2>
          <p className="text-xl text-cream/70 mb-12">
            Join us for an unforgettable dining experience. Book your table now or explore our diverse menu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="bg-palpasa-green text-white hover:bg-palpasa-orange px-10 py-7 text-lg font-bold rounded-full">
              <Link to="/contact">Book a Table Now</Link>
            </Button>
            <Link to="/menu" className="flex items-center space-x-2 text-palpasa-orange hover:text-palpasa-pink transition-colors font-medium text-lg">
              <span>View Full Menu</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
