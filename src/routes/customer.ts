import { Router } from 'express';
import { CustomerAccount } from '../controllers';

const router = Router();

router.route('/new').post(new CustomerAccount().create.bind(new CustomerAccount()));

export default router;