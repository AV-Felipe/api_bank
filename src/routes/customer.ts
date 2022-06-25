import { Router } from 'express';
import {CustomerAccount} from '../controllers/create-user-account';

const router = Router();

router.route('/new').post((request, response) => {
    new CustomerAccount(request, response);
});

export default router;