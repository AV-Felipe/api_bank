import { Account, Customer, NewAccount, ApiResponse } from '../models';
import { CustomerDataValidation } from '../modules/customer-data-validator';
import { DbAccess } from '../clients';

class CreateCustomerAccount {
    public async routine(data: NewAccount): Promise<ApiResponse> {

        const newCustomer: Partial<Customer> = data.newcustomer;
        const newAccount: Partial<Account> = data.newaccount;

        const validatedCustomer = new CustomerDataValidation(newCustomer)

        if (validatedCustomer.errors) {

            let response: ApiResponse = { data: "", messages: [] };
            response.messages = validatedCustomer.errors.trim().split("|");
            return response;

        }

        const insertedCustomer = await new DbAccess().insertCustomer(validatedCustomer.user);

        if (insertedCustomer.messages.length > 0) {

            return insertedCustomer;

        }

        // sets the new account digit to one as default and relates it to the newly created user
        newAccount.acverifier = "1";
        newAccount.owner = insertedCustomer.data;

        const insertedAccount = await new DbAccess().insertAccount(newAccount);

        if (insertedAccount.messages.length > 0) {
            return insertedAccount;
        }

        const createdAccount = await new DbAccess().getNewAccount(insertedCustomer.data)

        return createdAccount;

    }
}

export { CreateCustomerAccount };