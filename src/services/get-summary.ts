import { Account, ApiResponse } from '../models';
import { SummaryDataValidation } from '../modules';
import { DbAccess } from '../clients';
import { Request } from 'express';

class GetTransactionsSummary {
    public async routine(fullReq: Request): Promise<ApiResponse> {

        const data = fullReq.body;

        const account: Partial<Account> = data;

        const validatedAccount = new SummaryDataValidation(account);

        if (validatedAccount.errors) {

            let response: ApiResponse = { data: "", messages: [] };
            response.messages = validatedAccount.errors.trim().split("|");
            return response;

        }

        const accountId = await new DbAccess().getAccountId(account);

        if (accountId.messages.length > 0) {

            return accountId;

        }

        account.id = accountId.data;

        const accountSummary = await new DbAccess().getSummary(account);

        return accountSummary;

    }
}

export { GetTransactionsSummary };