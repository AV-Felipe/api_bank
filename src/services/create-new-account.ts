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
        console.log("oi" + validatedCustomer.errors);
        if (validatedCustomer.errors){
            console.log("bad data")
            let response: ApiResponse = {data: "", messages: []};
            response.messages = validatedCustomer.errors.trim().split("|");
            return response;
        }

        const insertedCustomer = await new DbAccess().insertCustomer(validatedCustomer.user);

        return insertedCustomer;
        //return newCustomer
    }
}

export {CreateCustomerAccount};