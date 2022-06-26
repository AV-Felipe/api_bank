import {Account, Customer, NewAccount, ApiResponse} from '../models';

class CreateCustomerAccount{
    public async routine(data: NewAccount): Promise<Customer>{
        console.log(data)
        const newCustomer: Customer = data.newcustomer;
        const newAccount: Account = data.newaccount;
        console.log(newCustomer);
        console.log(typeof(newCustomer));
        return newCustomer
    }
}

export {CreateCustomerAccount};