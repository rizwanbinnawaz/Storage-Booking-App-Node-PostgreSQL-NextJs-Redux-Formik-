import express from 'express';
import { checkBookingConflict, createBooking } from '../models/Book.js';
import { getBookingsByUser } from '../models/Booking.js';

const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    const { userName, unitId, startDate, endDate } = req.body;

    const hasConflict = await checkBookingConflict(unitId, startDate, endDate);

    if (hasConflict) {
      return res.status(400).json('Unit already booked for the selected dates');
    }

    await createBooking(userName, unitId, startDate, endDate);

    res.json('Booking confirmed');
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const { userName } = req.query;

    if (!userName) {
      return res.status(400).json({ message: 'userName query parameter is required' });
    }

    const bookings = await getBookingsByUser(userName);

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
