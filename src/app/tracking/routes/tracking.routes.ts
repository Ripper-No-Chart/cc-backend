import { Router } from 'express';
import UsersMiddlewares from '../../users/middlewares/user.middlewares';
import TrackingControlelr from '../controllers/tracking.controllers';

const router: Router = Router();

router.post('/create', UsersMiddlewares.getId, TrackingControlelr.create);
router.post('/get', TrackingControlelr.get);

export default router;