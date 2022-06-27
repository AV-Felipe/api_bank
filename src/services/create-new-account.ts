import {Account, Customer, NewAccount, ApiResponse} from '../models';
import {CustomerDataValidation} from '../modules/customer-data-validator';
import {DbAccess} from '../clients';

class CreateCustomerAccount{
    public async routine(data: NewAccount): Promise<ApiResponse>{
        console.log(data)
        const newCustomer: Partial<Customer> = data.newcustomer;
        const newAccount: Partial<Account> = data.newaccount;
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
        
        if (insertedCustomer.messages.length > 0){
            console.log("mensagem recebida: " + insertedCustomer.messages);
            return insertedCustomer;
        }
        console.log("new user id: " + String(insertedCustomer.data));
        
        newAccount.acverifier = "1";
        newAccount.owner = insertedCustomer.data;

        //TODO verification for agency and agency digit values
        const insertedAccount = await new DbAccess().insertAccount(newAccount);

        if (insertedAccount.messages.length > 0){
            return insertedAccount;
        }
        console.log("new account id: " + String(insertedAccount.data));

        const createdAccount = await new DbAccess().getNewAccount(insertedCustomer.data)
        
        return createdAccount;
        //return newCustomer
    }
}

export {CreateCustomerAccount};