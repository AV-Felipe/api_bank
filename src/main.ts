import express from "express";
import { config } from "./config";
import routes from './routes';

const app = express()

app.use(express.json());

app.use(routes);

app.listen(config.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});