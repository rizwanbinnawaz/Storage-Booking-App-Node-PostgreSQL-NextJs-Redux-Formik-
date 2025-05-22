import express from 'express';
import cors from 'cors';
import unitsRoutes from './routes/units.js';
import bookingsRoutes from './routes/bookings.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', unitsRoutes);
app.use('/', bookingsRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
    console.log('Access it at http://localhost:5000/');
  });