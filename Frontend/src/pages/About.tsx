import { motion } from 'motion/react';
import { Award, Users, Utensils, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Award className="w-8 h-8" />, label: 'Years of Excellence', value: '4+' },
    { icon: <Users className="w-8 h-8" />, label: 'Happy Customers', value: '50k+' },
    { icon: <Utensils className="w-8 h-8" />, label: 'Signature Dishes', value: '120+' },
    { icon: <Heart className="w-8 h-8" />, label: 'Expert Chefs', value: '12+' },
  ];

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-palpasa-pink font-medium tracking-widest uppercase text-sm mb-4 block">Our Heritage</span>
              <h1 className="text-5xl font-serif font-bold mb-8 leading-tight">
                A Tradition of <span className="text-palpasa-orange">Taste & Hospitality</span>
              </h1>
              <div className="space-y-6 text-brown-dark/70 leading-relaxed">
                <p>
                  Established in 2020, Hotel Palpasa began with a simple vision: to bring world-class dining to the heart of Itahari. What started as a small boutique cafe has grown into a premier destination for food lovers across the region.
                </p>
                <p>
                  Our name, "Palpasa," is inspired by the beauty and resilience of nature. Just as the Palpasa flower blooms with elegance, we strive to make every dining experience at our hotel a blooming memory for our guests.
                </p>
                <p>
                  We pride ourselves on our commitment to quality. Every ingredient is handpicked, every recipe is tested to perfection, and every guest is treated like royalty. Our soundproof private cabins and balcony dining are just a few ways we ensure your privacy and comfort.
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1550966842-2849a220276c?q=80&w=1000&auto=format&fit=crop" 
                alt="Restaurant interior" 
                className="rounded-2xl shadow-lg mt-8"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop" 
                alt="Chef plating" 
                className="rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/10 rounded-full -z-0 blur-3xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="luxury-card p-8 text-center"
            >
              <div className="text-palpasa-blue mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-serif font-bold mb-1">{stat.value}</div>
              <div className="text-brown-dark/60 text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brown-dark text-cream p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold mb-6 text-palpasa-orange">Our Mission</h3>
              <p className="text-cream/70 leading-relaxed">
                To provide an exceptional dining experience that combines high-quality food, a trendy atmosphere, and warm hospitality, making Hotel Palpasa the preferred choice for families, professionals, and food enthusiasts in Itahari.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-5">
              <Utensils size={200} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-3xl border border-gold/20 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold mb-6 text-palpasa-orange">Our Vision</h3>
              <p className="text-brown-dark/70 leading-relaxed">
                To be recognized as the leading hospitality brand in Eastern Nepal, known for our culinary innovation, commitment to guest satisfaction, and for creating a space where every meal tells a story of excellence.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-5 text-gold">
              <Heart size={200} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
