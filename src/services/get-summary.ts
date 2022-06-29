import {Account, Customer, NewAccount, ApiResponse, Transaction} from '../models';
import {Operation, OperationStrings} from '../types';
import {SummaryDataValidation} from '../modules';
import {DbAccess} from '../clients';
import { Request } from 'express';

class GetTransactionsSummary{
    public async routine(fullReq: Request): Promise<ApiResponse>{

        const data = fullReq.body;

        const account: Partial<Account> = data;

        // console.log(newCustomer);
        // console.log(typeof(newCustomer));

        const validatedAccount = new SummaryDataValidation(account);
        // console.log("oi" + validatedCustomer.errors);
        if (validatedAccount.errors){
            console.log("bad data")
            let response: ApiResponse = {data: "", messages: []};
            response.messages = validatedAccount.errors.trim().split("|");
            return response;
        }

        const accountId = await new DbAccess().getAccountId(account);
        
        if (accountId.messages.length > 0){
            console.log("mensagem recebida: " + accountId.messages);
            return accountId;
        }

        console.log("Account one id: " + String(accountId.data));

        account.id = accountId.data;
        console.log(account);

        //TODO: create db operation for get-summary
        const accountSummary = await new DbAccess().getSummary(account);

        return accountSummary;

        // const insertedAccount = await new DbAccess().insertAccount(newAccount);

        // if (insertedAccount.messages.length > 0){
        //     return insertedAccount;
        // }
        // console.log("new account id: " + String(insertedAccount.data));

        // const createdAccount = await new DbAccess().getNewAccount(insertedCustomer.data)
        
        // return createdAccount;
        //return newCustomer
    }
}

export {GetTransactionsSummary};