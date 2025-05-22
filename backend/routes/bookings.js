import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    const { userName, unitId, startDate, endDate } = req.body;

    const conflictCheck = await pool.query(
      'SELECT * FROM bookings WHERE unitId = $1 AND NOT ($3 < startDate OR $2 > endDate)',
      [unitId, startDate, endDate]
    );

    if (conflictCheck.rows.length > 0) {
      return res.status(400).json('Unit already booked for the selected dates');
    }

    await pool.query(
      'INSERT INTO bookings (userName, unitId, startDate, endDate) VALUES ($1, $2, $3, $4)',
      [userName, unitId, startDate, endDate]
    );

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

    const { rows } = await pool.query(
      `
        SELECT b.*, u.name AS unitName
        FROM bookings b
        JOIN storage_units u ON b.unitId = u.id
        WHERE b.userName = $1
      `,
      [userName]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
