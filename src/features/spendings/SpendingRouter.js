import SpendingController from './SpendingController';
import { application, Router } from 'express';

const router = Router();

router.post('/', SpendingController.store);
router.get('/', SpendingController.index);
router.get('/:id', SpendingController.show);

export default (app = application) => app.use('/app/spendings', router);
