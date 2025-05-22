import { pool } from '../db.js';

export async function checkBookingConflict(unitId, startDate, endDate) {
  const result = await pool.query(
    'SELECT * FROM bookings WHERE unitId = $1 AND NOT ($3 < startDate OR $2 > endDate)',
    [unitId, startDate, endDate]
  );
  return result.rows.length > 0;
}

export async function createBooking(userName, unitId, startDate, endDate) {
  await pool.query(
    'INSERT INTO bookings (userName, unitId, startDate, endDate) VALUES ($1, $2, $3, $4)',
    [userName, unitId, startDate, endDate]
  );
}
