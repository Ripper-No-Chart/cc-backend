import express from 'express';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import userRoutes from './app/users/routes/user.routes';
import trackingRoutes from './app/tracking/routes/tracking.routes';
import sessionsRoutes from './app/sessions/routes/session.routes';

// Database
import './database/database';

// Settings
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes usage
app.use('/api/session', sessionsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tracking', trackingRoutes);

export default app;
