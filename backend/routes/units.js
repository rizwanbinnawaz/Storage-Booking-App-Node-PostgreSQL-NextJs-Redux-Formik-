import express from 'express';
import { getAvailableUnits } from '../models/StorageUnit.js';

const router = express.Router();

router.get('/units', async (req, res) => {
  try {
    const filters = {
      location: req.query.location,
      size: req.query.size,
    };

    const units = await getAvailableUnits(filters);

    if (units.length === 0) {
      return res.status(404).json({ message: 'No available units found.' });
    }

    res.json(units);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch units' });
  }
});

export default router;
