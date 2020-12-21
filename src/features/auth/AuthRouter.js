import { application, Router } from 'express';
import AuthController from './AuthController';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/signout');

export default (app = application) => app.use('/auth', router);
