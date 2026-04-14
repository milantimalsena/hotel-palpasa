import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Reservation, Review, MenuItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Star, Utensils, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch reservations
        const qRes = query(
          collection(db, 'reservations'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapRes = await getDocs(qRes);
        setReservations(snapRes.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation)));

        // Fetch user reviews
        const qRev = query(
          collection(db, 'reviews'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapRev = await getDocs(qRev);
        setReviews(snapRev.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review)));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-palpasa-green"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-8 mb-12 flex flex-col md:flex-row items-center gap-8"
        >
          <Avatar className="w-24 h-24 border-4 border-palpasa-blue/20">
            <AvatarImage src={user?.photoURL || ''} />
            <AvatarFallback className="bg-palpasa-blue text-white text-2xl font-bold">
              {profile?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-serif font-bold mb-1">{profile?.displayName || 'Valued Guest'}</h1>
            <p className="text-brown-dark/60 mb-4">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Badge className="bg-palpasa-green/10 text-palpasa-green border-palpasa-green/20 px-3 py-1">
                {profile?.role === 'admin' ? 'Administrator' : 'Premium Member'}
              </Badge>
              <Badge variant="outline" className="border-palpasa-blue/20 px-3 py-1">
                Joined {profile?.createdAt.toDate().toLocaleDateString()}
              </Badge>
            </div>
          </div>
          <Button variant="outline" className="border-palpasa-green/30 text-palpasa-green hover:bg-palpasa-green hover:text-white">
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </motion.div>

        {/* Dashboard Content */}
        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="bg-white/50 border border-palpasa-blue/10 p-1 rounded-full mb-8">
            <TabsTrigger value="reservations" className="rounded-full px-8 data-[state=active]:bg-palpasa-green data-[state=active]:text-white">
              My Reservations
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full px-8 data-[state=active]:bg-palpasa-green data-[state=active]:text-white">
              My Reviews
            </TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-full px-8 data-[state=active]:bg-palpasa-green data-[state=active]:text-white">
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservations.length > 0 ? (
                reservations.map((res) => (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="luxury-card p-6"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-serif font-bold mb-1">Table for {res.guests}</h3>
                        <p className="text-sm text-brown-dark/40">ID: {res.id.slice(0, 8)}</p>
                      </div>
                      <Badge className={
                        res.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        res.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }>
                        {res.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col items-center p-3 bg-cream rounded-xl">
                        <Calendar className="w-5 h-5 text-palpasa-orange mb-1" />
                        <span className="text-xs font-bold">{res.date}</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-cream rounded-xl">
                        <Clock className="w-5 h-5 text-palpasa-orange mb-1" />
                        <span className="text-xs font-bold">{res.time}</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-cream rounded-xl">
                        <Users className="w-5 h-5 text-palpasa-orange mb-1" />
                        <span className="text-xs font-bold">{res.guests} Guests</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 border-palpasa-green/20 text-palpasa-green hover:bg-palpasa-green/10">
                        Modify
                      </Button>
                      <Button variant="outline" className="flex-1 border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600">
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 luxury-card">
                  <Utensils className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                  <p className="text-brown-dark/40 font-serif italic">You haven't made any reservations yet.</p>
                  <Button asChild className="luxury-button mt-6">
                    <a href="/contact">Book Your First Table</a>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="luxury-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-palpasa-orange fill-palpasa-orange' : 'text-palpasa-orange/20'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-brown-dark/40">
                        {review.createdAt.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-brown-dark/70 italic mb-4">"{review.comment}"</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold-dark">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500">Delete</Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 luxury-card">
                  <Star className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                  <p className="text-brown-dark/40 font-serif italic">You haven't written any reviews yet.</p>
                  <Button asChild className="luxury-button mt-6">
                    <a href="/menu">Rate Your Favorite Dishes</a>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-20 luxury-card">
              <Utensils className="w-12 h-12 text-gold/30 mx-auto mb-4" />
              <p className="text-brown-dark/40 font-serif italic">Coming soon! You'll be able to save your favorite dishes here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
