import { ApiResponse, Transaction } from '../models';
import { TransactionDataValidation } from '../modules';
import { DbAccess } from '../clients';
import { Request } from 'express';

class AddNewTransaction {
    public async routine(fullReq: Request): Promise<ApiResponse> {

        const data = fullReq.body;
        const route = fullReq.originalUrl.split('/');
        const transaction = route[route.length - 1].toUpperCase()

        const accountOne: Partial<Transaction> = data;
        accountOne.operation = transaction

        if (transaction === 'TRANSFER') {

            const accountTwo: Partial<Transaction> = accountOne.destination;
            accountTwo.operation = 'TRANSFER';
            accountTwo.value = accountOne.value;

            const validatedTransaction = new TransactionDataValidation(accountTwo);

            if (validatedTransaction.errors) {

                let response: ApiResponse = { data: "", messages: [] };
                response.messages = validatedTransaction.errors.trim().split("|");
                return response;

            }

            const accountId = await new DbAccess().getAccountId(accountTwo);

            if (accountId.messages.length > 0) {

                return accountId;

            }

            accountOne.destination.accountid = accountId.data;
        }

        const validatedTransaction = new TransactionDataValidation(accountOne);

        if (validatedTransaction.errors) {

            let response: ApiResponse = { data: "", messages: [] };
            response.messages = validatedTransaction.errors.trim().split("|");
            return response;

        }

        const accountId = await new DbAccess().getAccountId(accountOne);

        if (accountId.messages.length > 0) {

            return accountId;

        }

        accountOne.accountid = accountId.data;

        const insertTransaction = await new DbAccess().insertTransaction(accountOne);

        return insertTransaction;

    }
}

export { AddNewTransaction };