import {Account, Customer, NewAccount, ApiResponse, Transaction} from '../models';
import {Operation, OperationStrings} from '../types';
import {TransactionDataValidation} from '../modules';
import {DbAccess} from '../clients';
import { Request } from 'express';

class AddNewTransaction{
    public async routine(fullReq: Request): Promise<ApiResponse>{

        const data = fullReq.body;
        const route = fullReq.originalUrl.split('/');
        const transaction = route[route.length - 1].toUpperCase()

        const accountOne: Partial<Transaction> = data;
        accountOne.operation = transaction

        if (transaction === 'TRANSFER'){

            const accountTwo: Partial<Transaction> = accountOne.destination;
            accountTwo.operation = 'TRANSFER';
            console.log(accountTwo);
            const validatedTransaction = new TransactionDataValidation(accountTwo);

            if (validatedTransaction.errors){
                console.log("bad data on destination")
                let response: ApiResponse = {data: "", messages: []};
                response.messages = validatedTransaction.errors.trim().split("|");
                return response;
            }

            const accountId = await new DbAccess().getAccountId(accountTwo);
        
            if (accountId.messages.length > 0){
                console.log("mensagem recebida: " + accountId.messages);
                return accountId;
            }
    
            console.log("Account two id: " + String(accountId.data));
    
            accountOne.destination.accountid = accountId.data;
        }

        // console.log(newCustomer);
        // console.log(typeof(newCustomer));

        const validatedTransaction = new TransactionDataValidation(accountOne);
        // console.log("oi" + validatedCustomer.errors);
        if (validatedTransaction.errors){
            console.log("bad data")
            let response: ApiResponse = {data: "", messages: []};
            response.messages = validatedTransaction.errors.trim().split("|");
            return response;
        }

        const accountId = await new DbAccess().getAccountId(accountOne);
        
        if (accountId.messages.length > 0){
            console.log("mensagem recebida: " + accountId.messages);
            return accountId;
        }

        console.log("Account one id: " + String(accountId.data));

        accountOne.accountid = accountId.data;
        console.log(accountOne);

        //TODO: test if transaction is transfer, is so validate second account and call proper db operation
        const insertTransaction = await new DbAccess().insertTransaction(accountOne);

        return insertTransaction;

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

export {AddNewTransaction};