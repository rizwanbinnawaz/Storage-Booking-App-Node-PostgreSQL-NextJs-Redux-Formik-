import { pool } from '../db.js';

export async function getBookingsByUser(userName) {
  const { rows } = await pool.query(
    `
      SELECT b.*, u.name AS unitName
      FROM bookings b
      JOIN storage_units u ON b.unitId = u.id
      WHERE b.userName = $1
    `,
    [userName]
  );
  return rows;
}
