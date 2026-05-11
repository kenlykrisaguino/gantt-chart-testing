export type BookingStatus = 'paid' | 'waiting' | 'offline';

export interface Charge {
  name: string;
  description: string;
  nominal: number;
}

export interface Booking {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  roomId: string;
  roomName: string;
  branch: string;
  date: string; // ISO format
  startTime: string; // "09:00"
  endTime: string; // "13:00"
  duration: number; // in hours
  status: BookingStatus;
  charges: Charge[];
  total: number;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: 'vip' | 'regular' | 'premium' | 'studio' | 'meeting';
}

export interface Branch {
  id: string;
  name: string;
}
