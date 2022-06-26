import dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();

const config = {
    PORT: process.env.PORT,
    POSTGRES_USER: env.POSTGRES_USER,
    POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
    POSTGRES_DB: env.POSTGRES_DB,
    POSTGRES_PORT: 5432,
    POSTGRES_HOST: 'localhost'
};

export { config };