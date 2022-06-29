import { Router } from 'express';
import customer_accounts from './customer';
import customer_transactions from './transactions';

const routes = Router();

routes.use('/customer', customer_accounts);
routes.use('/transactions', customer_transactions);

export default routes;