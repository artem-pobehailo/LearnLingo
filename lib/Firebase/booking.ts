import { ref, push, set } from 'firebase/database';
import { db } from './Firebase';

export type BookingData = {
  teacherId: string;
  username: string;
  email: string;
  phone: string;
  reason: string;
  level: string;
  createdAt: number;
};

export const addBooking = async (data: BookingData) => {
  const bookingsRef = ref(db, 'bookings');
  const newBookingRef = push(bookingsRef);

  await set(newBookingRef, {
    ...data,
    createdAt: Date.now(),
  });
};
