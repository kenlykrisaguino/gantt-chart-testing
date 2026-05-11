import { Room, Booking, Branch } from './types';
import { format, addDays, subDays } from 'date-fns';

export const BRANCHES: Branch[] = [
  { id: 'kedungmundu', name: 'Kedungmundu' },
  { id: 'tembalang', name: 'Tembalang' },
  { id: 'banyumanik', name: 'Banyumanik' },
  { id: 'semarang-tengah', name: 'Semarang Tengah' },
];

export const ROOMS: Room[] = [
  { id: 'v1', name: 'VIP 1', capacity: 10, type: 'vip' },
  { id: 'v2', name: 'VIP 2', capacity: 8, type: 'vip' },
  { id: 'v3', name: 'VIP 3', capacity: 10, type: 'vip' },
  { id: 'r1', name: 'Regular 1', capacity: 6, type: 'regular' },
  { id: 'r2', name: 'Regular 2', capacity: 5, type: 'regular' },
  { id: 'r3', name: 'Regular 3', capacity: 6, type: 'regular' },
  { id: 'p1', name: 'Premium 1', capacity: 12, type: 'premium' },
  { id: 'p2', name: 'Premium 2', capacity: 12, type: 'premium' },
  { id: 's1', name: 'Studio 1', capacity: 4, type: 'studio' },
  { id: 's2', name: 'Studio 2', capacity: 3, type: 'studio' },
  { id: 's3', name: 'Studio 3', capacity: 4, type: 'studio' },
  { id: 'm1', name: 'Meeting 1', capacity: 15, type: 'meeting' },
];

const today = new Date('2026-05-11');
const dayBefore = subDays(today, 1);
const dayAfter = addDays(today, 1);

const todayStr = format(today, 'yyyy-MM-dd');
const dayBeforeStr = format(dayBefore, 'yyyy-MM-dd');
const dayAfterStr = format(dayAfter, 'yyyy-MM-dd');

export const MOCK_BOOKINGS: Booking[] = [
  // MAY 10
  {
    id: 'b10-1',
    orderId: 'ORD-20260510-001',
    customerId: 'c101',
    customerName: 'Yanto Sugiarto',
    customerPhone: '0811-1111-2222',
    roomId: 'v1',
    roomName: 'VIP 1',
    branch: 'Kedungmundu',
    date: dayBeforeStr,
    startTime: '10:00',
    endTime: '14:00',
    duration: 4,
    status: 'paid',
    charges: [
      { name: 'Room Rate', description: '4 hours VIP Room', nominal: 2000000 },
      { name: 'Service Charge', description: '10% Service Fee', nominal: 200000 },
    ],
    total: 2200000,
  },
  {
    id: 'b10-2',
    orderId: 'ORD-20260510-002',
    customerId: 'c102',
    customerName: 'Bambang Sudarto',
    customerPhone: '0812-2222-3333',
    roomId: 'm1',
    roomName: 'Meeting 1',
    branch: 'Kedungmundu',
    date: dayBeforeStr,
    startTime: '08:00',
    endTime: '12:00',
    duration: 4,
    status: 'paid',
    charges: [
      { name: 'Room Rate', description: '4 hours Meeting Room', nominal: 4000000 },
      { name: 'Service Charge', description: '10% Service Fee', nominal: 400000 },
    ],
    total: 4400000,
  },

  // MAY 11 (Today)
  {
    id: 'b1',
    orderId: 'ORD-20260310-001',
    customerId: 'c1',
    customerName: 'Aditya Hermawan',
    customerPhone: '0812-3456-7890',
    roomId: 'v1',
    roomName: 'VIP 1',
    branch: 'Kedungmundu',
    date: todayStr,
    startTime: '09:00',
    endTime: '13:00',
    duration: 4,
    status: 'paid',
    charges: [
      { name: 'Room Rate', description: '4 hours VIP Room', nominal: 2000000 },
      { name: 'Service Charge', description: '10% Service Fee', nominal: 200000 },
    ],
    total: 2200000,
  },
  {
    id: 'b2',
    orderId: 'ORD-20260310-002',
    customerId: 'c2',
    customerName: 'Siti Aminah',
    customerPhone: '0856-9876-5432',
    roomId: 'v2',
    roomName: 'VIP 2',
    branch: 'Kedungmundu',
    date: todayStr,
    startTime: '10:00',
    endTime: '12:00',
    duration: 2,
    status: 'waiting',
    charges: [
      { name: 'Room Rate', description: '2 hours VIP Room', nominal: 1000000 },
      { name: 'Service Charge', description: '10% Service Fee', nominal: 100000 },
    ],
    total: 1100000,
  },
  {
    id: 'b_overflow',
    orderId: 'ORD-OVERFLOW-001',
    customerId: 'c_over',
    customerName: 'Night Owl Party',
    customerPhone: '0812-9999-0000',
    roomId: 'p1',
    roomName: 'Premium 1',
    branch: 'Kedungmundu',
    date: todayStr,
    startTime: '22:00',
    endTime: '02:00',
    duration: 4,
    status: 'paid',
    charges: [
      { name: 'Room Rate', description: 'Late Night Session (4h)', nominal: 3000000 },
      { name: 'Service Fee', description: 'Night service', nominal: 300000 },
    ],
    total: 3300000,
  },
  {
    id: 'b4',
    orderId: 'ORD-20260310-004',
    customerId: 'c4',
    customerName: 'Dewi Lestari',
    customerPhone: '0813-5566-7788',
    roomId: 'p2',
    roomName: 'Premium 2',
    branch: 'Kedungmundu',
    date: todayStr,
    startTime: '15:00',
    endTime: '18:00',
    duration: 3,
    status: 'paid',
    charges: [
      { name: 'Room Rate', description: '3 hours Premium Room', nominal: 1800000 },
      { name: 'Service Charge', description: '10% Service Fee', nominal: 180000 },
    ],
    total: 1980000,
  },

  // MAY 12
  {
    id: 'b12-1',
    orderId: 'ORD-20260512-001',
    customerId: 'c121',
    customerName: 'Future Client',
    customerPhone: '0812-0000-1111',
    roomId: 's1',
    roomName: 'Studio 1',
    branch: 'Kedungmundu',
    date: dayAfterStr,
    startTime: '13:00',
    endTime: '15:00',
    duration: 2,
    status: 'paid',
    charges: [
      { name: 'Room Rate', description: '2 hours Studio', nominal: 500000 },
      { name: 'Service Charge', description: '10% Service Fee', nominal: 50000 },
    ],
    total: 550000,
  },
  {
    id: 'b12-overflow-part2',
    orderId: 'ORD-OVERFLOW-001-P2',
    customerId: 'c_over',
    customerName: 'Night Owl Party (Cont.)',
    customerPhone: '0812-9999-0000',
    roomId: 'p1',
    roomName: 'Premium 1',
    branch: 'Kedungmundu',
    date: dayAfterStr,
    startTime: '00:00',
    endTime: '02:00',
    duration: 2,
    status: 'paid',
    charges: [
      { name: 'Extended Time', description: 'Continuation', nominal: 1000000 },
    ],
    total: 1000000,
  }
];
