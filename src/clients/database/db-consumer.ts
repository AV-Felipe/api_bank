import { PoolClient } from 'pg';
import {DbConnection} from '.';
import {Customer, Account, ApiResponse} from '../../models'

class DbAccess extends DbConnection {
    private async getClient(): Promise<PoolClient> {
        
        try {
            const client = await this.connectionPool.connect();
    
    
            const query = client.query;
            const release = client.release;
    
            const timeoutId = setTimeout(() => {
                console.log('A client has been checked out for more than 5 seconds!');
                // console.log(`The last executed query on this client was: ${client.lastQuery}`);
            }, 5000);
    
            // client.query = (...args) => {
            //     client.lastQuery = args;
            //     return query.apply(client, args);
            // }
    
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

        let response: ApiResponse = {data: "", messages: []};

        try{
            const queryResult: any = await client.query(queryString, parameters);
            console.log("retorno do pg:")
            console.log(queryResult.rows[0].id);
            response.data = queryResult.rows[0].id;
        } catch (err){
            console.log("to aqui " + err);
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

        let response: ApiResponse = {data: "", messages: []};

        try{
            const queryResult: any = await client.query(queryString, parameters);
            console.log("retorno do pg:")
            console.log(queryResult.rows[0].id);
            response.data = queryResult.rows[0].id;
        } catch (err){
            console.log("to aqui 2 " + err);
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
        console.log("vou procurar por: " + customerId + " ou\n" + String(customerId));
        const parameters = [customerId];

        let response: ApiResponse = {data: "", messages: []};

        try{
            const queryResult: any = await client.query(queryString, parameters);
            console.log("retorno do pg:")
            console.log(queryResult.rows);
            response.data = queryResult.rows[0];
        } catch (err){
            console.log("to aqui 3 " + err);
            response.messages.push(err);
        }

        client.release();
        
        return response;
    }
}

export {DbAccess};