import { Router } from 'express';
import customer_accounts from './customer';

const routes = Router();

routes.use('/customer', customer_accounts);

export default routes;