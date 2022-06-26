import { Router } from 'express';
import {CustomerAccount} from '../controllers/create-user-account';

const router = Router();

// the class constructor cannot be an async function, this would be
//a problem for using the controller strictly as a handler for the request
//and results (considering it must be a class...)
router.route('/new').post(new CustomerAccount().create.bind(new CustomerAccount())); //the bind fixes the scope of all 'this' references, within the class, to the provided context (here the class instance itself), otherwise we would get typeError for this method call

export default router;