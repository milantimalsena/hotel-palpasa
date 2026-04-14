import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';

const reservationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.number().min(1, 'At least 1 guest required').max(50, 'For more than 50 guests, please call us'),
  message: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    }
  });

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reservations'), {
        ...data,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      toast.success('Reservation request sent! We will contact you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Something went wrong. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Get in <span className="text-palpasa-orange">Touch</span></h1>
          <p className="text-brown-dark/60 max-w-2xl mx-auto">
            Have a question or want to book a table? We're here to help you plan your perfect dining experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="luxury-card p-8"
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-palpasa-blue">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-palpasa-blue/10 rounded-full flex items-center justify-center text-palpasa-blue shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Location</p>
                    <p className="text-brown-dark/60 text-sm">Itahari-6, Sunsari, Nepal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-palpasa-blue/10 rounded-full flex items-center justify-center text-palpasa-blue shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Phone</p>
                    <p className="text-brown-dark/60 text-sm">+977 98XXXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-palpasa-blue/10 rounded-full flex items-center justify-center text-palpasa-blue shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-brown-dark/60 text-sm">info@hotelpalpasa.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gold/10">
                <Button className="w-full bg-palpasa-green hover:bg-palpasa-green/90 text-white rounded-full flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="luxury-card p-8 bg-brown-dark text-cream"
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-palpasa-orange">Opening Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-cream/10">
                  <span>Monday - Friday</span>
                  <span className="text-palpasa-orange">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-cream/10">
                  <span>Saturday</span>
                  <span className="text-palpasa-orange">08:00 - 23:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunday</span>
                  <span className="text-palpasa-orange">09:00 - 22:00</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card p-10"
            >
              <h3 className="text-3xl font-serif font-bold mb-8 text-palpasa-blue">Book a Table</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register('name')} className="luxury-input" placeholder="John Doe" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register('email')} className="luxury-input" placeholder="john@example.com" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" {...register('phone')} className="luxury-input" placeholder="+977 98XXXXXXXX" />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input id="guests" type="number" {...register('guests', { valueAsNumber: true })} className="luxury-input" />
                    {errors.guests && <p className="text-red-500 text-xs">{errors.guests.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" {...register('date')} className="luxury-input" />
                    {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" {...register('time')} className="luxury-input" />
                    {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Special Requests (Optional)</Label>
                  <Textarea id="message" {...register('message')} className="luxury-input min-h-[120px]" placeholder="Any dietary requirements or special occasions?" />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full luxury-button py-6 text-lg">
                  {isSubmitting ? 'Submitting...' : 'Send Reservation Request'}
                  {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[450px] border-4 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d780.0!2d87.2756161!3d26.6945021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6b00540cf4e5%3A0xeac4c4d4b9ccf292!2sHotel%20Palpasa!5e0!3m2!1sen!2snp!4v1712980000000!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
