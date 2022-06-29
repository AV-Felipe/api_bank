import { PoolClient } from 'pg';
import { DbConnection } from '.';
import { OperationStrings } from '../../types';
import { Customer, Account, ApiResponse, Transaction } from '../../models'

class DbAccess extends DbConnection {
    private async getClient(): Promise<PoolClient> {

        try {
            const client = await this.connectionPool.connect();


            const query = client.query;
            const release = client.release;

            const timeoutId = setTimeout(() => {
                console.log('A client has been checked out for more than 5 seconds!');
            }, 5000);

            client.release = () => {
                clearTimeout(timeoutId);

                client.query = query;
                client.release = release;

                return release.apply(client);
            }

            return client

        } catch (error) {
            console.log(error);
        }


    }

    public async insertCustomer(customer: Partial<Customer>): Promise<ApiResponse> {

        const client = await this.getClient();

        const queryString = `
            INSERT INTO customers (full_name, email, cpf, birthdate)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;

        const parameters = [customer.name, customer.email, customer.cpf, customer.birthdate];

        let response: ApiResponse = { data: "", messages: [] };

        try {
            const queryResult: any = await client.query(queryString, parameters);
            response.data = queryResult.rows[0].id;
        } catch (err) {
            response.messages.push(err);
        }

        client.release();

        return response;
    }

    public async insertAccount(account: Partial<Account>): Promise<ApiResponse> {

        const client = await this.getClient();

        const queryString = `
            insert into accounts (ac_digit, ag_number, ag_digit, owner)
            values ($1, $2, $3, $4)
            RETURNING id;
        `;

        const parameters = [account.acverifier, account.agency, account.agverifier, account.owner];

        let response: ApiResponse = { data: "", messages: [] };

        try {
            const queryResult: any = await client.query(queryString, parameters);
            response.data = queryResult.rows[0].id;
        } catch (err) {
            response.messages.push(err);
        }

        client.release();

        return response;
    }

    public async getNewAccount(customerId: String): Promise<ApiResponse> {

        const client = await this.getClient();

        const queryString = `
            SELECT full_name, email, cpf, birthdate, ac_number, ac_digit, ag_number, ag_digit
            FROM customers
            INNER JOIN accounts ON customers.id = $1;
        `;

        const parameters = [customerId];

        let response: ApiResponse = { data: "", messages: [] };

        try {
            const queryResult: any = await client.query(queryString, parameters);
            response.data = queryResult.rows[0];
        } catch (err) {
            response.messages.push(err);
        }

        client.release();

        return response;
    }

    public async getAccountId(transaction: Partial<Transaction>): Promise<ApiResponse> {

        const client = await this.getClient();

        const queryString = `
            SELECT id
            FROM accounts
            WHERE ag_number = $1
            AND ag_digit = $2
            AND ac_number = $3
            AND ac_digit = $4;
        `;

        const parameters = [transaction.agency, transaction.agverifier, transaction.account, transaction.acverifier];

        let response: ApiResponse = { data: "", messages: [] };

        try {
            const queryResult: any = await client.query(queryString, parameters);
            response.data = queryResult.rows[0].id;
        } catch (err) {
            response.messages.push(err);
        }

        client.release();

        return response;
    }

    public async insertTransaction(transaction: Partial<Transaction>): Promise<ApiResponse> {

        const client = await this.getClient();

        let bankTax = 0;
        const parametersA = [transaction.accountid, transaction.value, transaction.operation];
        const parametersB: any[] = [transaction.accountid, OperationStrings[3]];

        let response: ApiResponse = { data: "", messages: [] };

        try {
            if (transaction.operation === 'DEPOSIT') {

                bankTax = Math.round(transaction.value * 0.01);
                parametersB.push(bankTax);

                await client.query('BEGIN');

                const queryStringA = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'C', $2, $3)
                RETURNING id;
                `;
                const responseA: any = await client.query(queryStringA, parametersA);

                const queryStringB = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'D', $3, $2)
                RETURNING id;
                `;
                const responseB: any = await client.query(queryStringB, parametersB);

                const returnParameters = [responseA.rows[0].id, responseB.rows[0].id]

                const queryStringC = `
                SELECT id, operation, value, description
                FROM transactions
                WHERE id IN ($1, $2);
                `;
                const responseC: any = await client.query(queryStringC, returnParameters);

                response.data = responseC.rows;

                await client.query('COMMIT');
            }

            if (transaction.operation === 'WITHDRAW') {

                bankTax = 400;
                parametersB.push(bankTax);

                await client.query('BEGIN');

                const queryStringA = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'D', $2, $3)
                RETURNING id;
                `;
                const responseA: any = await client.query(queryStringA, parametersA);

                const queryStringB = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'D', $3, $2)
                RETURNING id;
                `;
                const responseB: any = await client.query(queryStringB, parametersB);

                const returnParameters = [responseA.rows[0].id, responseB.rows[0].id]

                const queryStringC = `
                SELECT id, operation, value, description
                FROM transactions
                WHERE id IN ($1, $2);
                `;
                const responseC: any = await client.query(queryStringC, returnParameters);

                response.data = responseC.rows;

                await client.query('COMMIT');
            }

            if (transaction.operation === 'TRANSFER') {

                bankTax = 100;
                parametersB.push(bankTax);

                await client.query('BEGIN');

                const queryStringA = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'D', $2, $3)
                RETURNING id;
                `;
                const responseA: any = await client.query(queryStringA, parametersA);

                const queryStringB = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'D', $3, $2)
                RETURNING id;
                `;
                const responseB: any = await client.query(queryStringB, parametersB);

                const queryStringC = `
                INSERT INTO transactions (account, operation, value, description)
                VALUES ($1, 'C', $2, $3)
                RETURNING id;
                `;
                const parametersC = [transaction.destination.accountid, transaction.value, transaction.operation];
                const responseC: any = await client.query(queryStringC, parametersC);

                const returnParameters = [responseA.rows[0].id, responseB.rows[0].id, responseC.rows[0].id]
                const queryStringD = `
                SELECT id, operation, value, description
                FROM transactions
                WHERE id IN ($1, $2, $3);
                `;
                const responseD: any = await client.query(queryStringD, returnParameters);

                response.data = responseD.rows;

                await client.query('COMMIT');
            }

        } catch (err) {

            await client.query('ROLLBACK');

            response.messages.push(err);
        }

        client.release();

        return response;
    }

    public async getSummary(account: Partial<Account>): Promise<ApiResponse> {

        const client = await this.getClient();

        const queryString = `
            SELECT operation, value, description, created_at as date FROM transactions
            Where account = $1;
        `;

        const parameters = [account.id];

        let response: ApiResponse = { data: "", messages: [] };

        try {
            const queryResult: any = await client.query(queryString, parameters);
            response.data = queryResult.rows;
        } catch (err) {
            response.messages.push(err);
        }

        client.release();

        return response;
    }
}

export { DbAccess };