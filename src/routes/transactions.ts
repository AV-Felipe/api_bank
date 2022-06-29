import { Router } from 'express';
import {TransactionController} from '../controllers';

const router = Router();

router.route('/deposit').post(new TransactionController().create.bind(new TransactionController()));
router.route('/withdraw').post(new TransactionController().create.bind(new TransactionController()));
router.route('/transfer').post(new TransactionController().create.bind(new TransactionController()));

export default router;