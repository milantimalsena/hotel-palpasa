import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuCategory, MenuItem } from '@/types';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for menu items
  const menuItems: MenuItem[] = [
    { id: '1', name: 'Crispy Chicken Wings', price: 450, category: 'Starters', description: 'Golden fried wings tossed in spicy buffalo sauce.', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1000&auto=format&fit=crop', rating: 4.8, cuisine: 'American' },
    { id: '2', name: 'Paneer Tikka', price: 380, category: 'Starters', description: 'Marinated cottage cheese grilled to perfection.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop', rating: 4.7, cuisine: 'Indian' },
    { id: '3', name: 'Palpasa Special Thali', price: 650, category: 'Main Course', description: 'Authentic Nepali thali with seasonal vegetables and choice of meat.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop', rating: 4.9, cuisine: 'Nepali' },
    { id: '4', name: 'Butter Chicken', price: 550, category: 'Main Course', description: 'Creamy tomato-based curry with tender chicken pieces.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop', rating: 4.8, cuisine: 'Indian' },
    { id: '5', name: 'Gulab Jamun with Ice Cream', price: 250, category: 'Desserts', description: 'Warm milk dumplings served with vanilla ice cream.', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000&auto=format&fit=crop', rating: 4.9, cuisine: 'Indian' },
    { id: '6', name: 'Chocolate Lava Cake', price: 350, category: 'Desserts', description: 'Rich chocolate cake with a molten center.', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000&auto=format&fit=crop', rating: 4.8, cuisine: 'Continental' },
    { id: '7', name: 'Fresh Mint Mojito', price: 220, category: 'Drinks', description: 'Refreshing blend of mint, lime, and soda.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop', rating: 4.6, cuisine: 'Global' },
    { id: '8', name: 'Iced Caramel Macchiato', price: 280, category: 'Drinks', description: 'Premium coffee with caramel drizzle and cold milk.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop', rating: 4.7, cuisine: 'Cafe' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories: (MenuCategory | 'All')[] = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif font-bold mb-4"
          >
            Our <span className="text-palpasa-orange">Exquisite Menu</span>
          </motion.h1>
          <p className="text-brown-dark/60 max-w-2xl mx-auto">
            From local favorites to international delicacies, explore our carefully curated selection of dishes.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="w-full md:w-auto">
            <Tabs defaultValue="All" className="w-full" onValueChange={(v) => setActiveCategory(v as any)}>
              <TabsList className="bg-white/50 border border-gold/10 p-1 rounded-full overflow-x-auto flex-nowrap">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-full px-6 data-[state=active]:bg-palpasa-green data-[state=active]:text-white"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-palpasa-blue/50 w-4 h-4" />
            <Input 
              placeholder="Search dishes..." 
              className="pl-10 luxury-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="luxury-card overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-brown-dark border-none flex items-center gap-1">
                      <Star className="w-3 h-3 text-palpasa-orange fill-palpasa-orange" />
                      {item.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-palpasa-blue text-white border-none">
                      {item.cuisine}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                    <span className="text-palpasa-green font-bold">Rs. {item.price}</span>
                  </div>
                  <p className="text-brown-dark/60 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <Button variant="outline" className="w-full border-palpasa-green/30 text-palpasa-green hover:bg-palpasa-green hover:text-white">
                    Order Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-brown-dark/40 font-serif italic">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
