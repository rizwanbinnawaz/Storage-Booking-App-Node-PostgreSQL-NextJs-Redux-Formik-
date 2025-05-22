import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/units', async (req, res) => {
  try {
    const { location, size } = req.query;
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

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No available units found.' });
    }

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch units' });
  }
});

export default router;
