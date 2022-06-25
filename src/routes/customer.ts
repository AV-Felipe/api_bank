import { Router } from 'express';
import {CustomerAccount} from '../controllers/create-user-account';

const router = Router();

// the class constructor cannot be an async function, this would be
//a problem for using the controller strictly as a handler for the request
//and results (considering it must be a class...)
router.route('/new').post(new CustomerAccount().create); // here we are providing the method as an anonym function, the .bind(new CustomerAccount()) is being omitted for test purpose

export default router;