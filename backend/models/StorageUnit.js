import { pool } from '../db.js';

export async function getAvailableUnits(filters) {
  const { location, size } = filters;
  let query = 'SELECT * FROM storage_units WHERE isAvailable = true';
  const params = [];

  if (location) {
    params.push(location);
    query += ` AND location = $${params.length}`;
  }

  if (size) {
    params.push(size);
    query += ` AND size = $${params.length}`;
  }

  const { rows } = await pool.query(query, params);
  return rows;
}
