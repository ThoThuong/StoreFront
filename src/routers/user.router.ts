import express, { Request, Response, Router } from 'express';

import Login from '../handlers/login.handler';
import UserHandler from '../handlers/user.handler';
import Authentication from '../middleware/auth.middleware';

const userHandler: UserHandler = new UserHandler()
const router: Router = express.Router();
const authentication: Authentication = new Authentication();
const login: Login = new Login();

router.get('/test-user-router', (req: Request, res: Response) => {
  res.status(200).json({ content: 'user-router-ok' })
});

router.post('/auth', login.authen);
router.post('/', userHandler.create);
router.get('/:id', authentication.auth, userHandler.read);
router.get('/orders/:userId', authentication.auth, userHandler.readUserOrders);
router.get('/', authentication.auth, userHandler.index);
router.put('/:id', authentication.auth, userHandler.update);
router.delete('/:id', authentication.auth, userHandler.deleteUser);

export { router as userRouters };