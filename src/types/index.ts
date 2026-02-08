// User Types
export type UserRole = 'traveler' | 'guide' | 'admin';

export interface User {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Traveler extends User {
  role: 'traveler';
  nationality: string;
  languages: string[];
  favorites: string[]; // guide IDs
}

export interface Guide extends User {
  role: 'guide';
  photo: string;
  area: string;
  areaEn: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  bio: string;
  bioEn: string;
  certifications: string[];
  yearsExperience: number;
  tourPlans: TourPlan[];
  availability: Record<string, boolean>; // date string -> available
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
  bankAccount?: string;
  qualificationDocs?: string[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Tour Plan
export interface TourPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // hours
  price: number;
  maxPeople: number;
  includes: string[];
}

// Booking
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  guideId: string;
  travelerId: string;
  tourPlanId: string;
  date: string;
  numberOfPeople: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt: string;
  reviewed: boolean;
}

// Review
export interface Review {
  id: string;
  bookingId: string;
  guideId: string;
  travelerId: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
  helpful: number;
}

// Message
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  filtered: boolean; // whether content was filtered
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  lastMessage: Message;
  unreadCount: number;
}

// Settings
export interface AppSettings {
  wordFilter: {
    enabled: boolean;
    bannedWords: string[];
  };
  commission: {
    rate: number; // percentage
  };
  paymentMethods: string[];
}

// Filter Options
export interface GuideFilters {
  area?: string;
  language?: string;
  specialty?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export type SortOption = 'recommended' | 'rating' | 'price-low' | 'price-high';

// Statistics
export interface DashboardStats {
  totalUsers: number;
  totalGuides: number;
  totalBookings: number;
  totalRevenue: number;
  pendingGuides: number;
  activeBookings: number;
}

export interface GuideEarnings {
  thisMonth: number;
  lastMonth: number;
  total: number;
  pendingPayouts: number;
}
