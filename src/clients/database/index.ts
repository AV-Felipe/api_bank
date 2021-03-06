import { Pool } from 'pg';
import { config } from '../../config';

class DbConnection {
    protected connectionPool: Pool;

    public constructor() {
        this.connectionPool = new Pool({
            user: config.POSTGRES_USER,
            host: config.POSTGRES_HOST,
            database: config.POSTGRES_DB,
            max: 10,
            idleTimeoutMillis: 10000,
            connectionTimeoutMillis: 10000,
            password: config.POSTGRES_PASSWORD,
            port: config.POSTGRES_PORT,
        })
    }
}

export { DbConnection };