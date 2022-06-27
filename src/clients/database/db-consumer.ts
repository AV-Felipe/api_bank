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
            RETURNING id, full_name, email, cpf, birthdate;
        `;

        const parameters = [customer.name, customer.email, customer.cpf, customer.birthdate];

        let response: ApiResponse = {data: "", messages: []};

        try{
            const queryResult: any = await client.query(queryString, parameters);
            response.data = queryResult.rows;
        } catch (err){
            console.log("to aqui " + err);
            response.messages.push(err);
        }

        client.release();
        
        return response;
    }
}

export {DbAccess};