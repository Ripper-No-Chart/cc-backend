import { Router } from 'express';
import UsersMiddlewares from '../../users/middlewares/user.middlewares';
import SessionController from '../controllers/session.controllers';

const router: Router = Router();

router.post('/save', UsersMiddlewares.getId, SessionController.save);
router.post('/get', SessionController.get);

export default router;
