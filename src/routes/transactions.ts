import { Router } from 'express';
import {TransactionController} from '../controllers';

const router = Router();

router.route('/deposit').post(new TransactionController().create.bind(new TransactionController()));

export default router;