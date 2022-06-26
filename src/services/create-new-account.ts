import {Account, Customer, NewAccount, ApiResponse} from '../models';
import {CustomerDataValidation} from '../modules/customer-data-validator';
import {DbAccess} from '../clients';

class CreateCustomerAccount{
    public async routine(data: NewAccount): Promise<ApiResponse>{
        console.log(data)
        const newCustomer: Customer = data.newcustomer;
        const newAccount: Account = data.newaccount;
        console.log(newCustomer);
        console.log(typeof(newCustomer));

        const validatedCustomer = new CustomerDataValidation(newCustomer)

        if (validatedCustomer.errors){
            let response: ApiResponse;
            response.messages = validatedCustomer.errors.trim().split("|");
            return response;
        }

        const insertedCustomer = await new DbAccess().insertCustomer(validatedCustomer.user);

        return insertedCustomer;
        //return newCustomer
    }
}

export {CreateCustomerAccount};