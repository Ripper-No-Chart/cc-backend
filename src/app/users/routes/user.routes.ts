import { Router } from 'express';
import UsersControllers from '../controllers/user.controllers';
import UsersMiddlewares from '../middlewares/user.middlewares';

const router: Router = Router();

router.post('/create_user', UsersMiddlewares.checkUser, UsersControllers.createUser);
router.post('/edit_user', UsersMiddlewares.getId, UsersControllers.editUser);
router.post('/get_users', UsersControllers.getUsers);
router.post('/get_user', UsersControllers.getUser);
router.post('/delete_user', UsersMiddlewares.getId, UsersControllers.deleteUser);

export default router;
