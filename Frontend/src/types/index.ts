import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'customer';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string;
  photoURL: string | null;
  role: UserRole;
  createdAt: Timestamp;
}

export type MenuCategory = 'Starters' | 'Main Course' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  cuisine?: string;
  image?: string;
  rating?: number;
  ratingCount?: number;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  createdAt: Timestamp;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  dishId?: string;
  createdAt: Timestamp;
}
