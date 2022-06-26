import {Account, Customer, NewAccount, ApiResponse} from '../models';
import {CustomerDataValidation} from '../modules/customer-data-validator';

class CreateCustomerAccount{
    public async routine(data: NewAccount): Promise<CustomerDataValidation>{
        console.log(data)
        const newCustomer: Customer = data.newcustomer;
        const newAccount: Account = data.newaccount;
        console.log(newCustomer);
        console.log(typeof(newCustomer));

        const validatedCustomer = new CustomerDataValidation(newCustomer)

        return validatedCustomer
        //return newCustomer
    }
}

export {CreateCustomerAccount};