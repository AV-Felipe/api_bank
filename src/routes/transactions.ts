import { Router } from 'express';
import { TransactionController, GetSummaryController } from '../controllers';

const router = Router();

router.route('/deposit').post(new TransactionController().create.bind(new TransactionController()));
router.route('/withdraw').post(new TransactionController().create.bind(new TransactionController()));
router.route('/transfer').post(new TransactionController().create.bind(new TransactionController()));

router.route('/summary').post(new GetSummaryController().create.bind(new GetSummaryController()));

export default router;