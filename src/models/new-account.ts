import {Customer, Account} from './index';

interface NewAccount {
    newcustomer: Partial<Customer>,
    newaccount: Account
}

export {NewAccount};