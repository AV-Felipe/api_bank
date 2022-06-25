import {app} from './app';
import { config } from "./config";

app.listen(config.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});