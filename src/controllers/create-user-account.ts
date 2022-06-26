import { Request, Response } from "express";
import {CreateCustomerAccount} from '../services';

class CustomerAccount {

    private service = CreateCustomerAccount;

    public async create (req: Request, res: Response) {
        //TODO:
        // manda a req para o serviço de criação de conta
        // aguarda o retorno do serviço de criação de conta
        // responde para o usuário se criou ou deu erro
        console.log(req.body);

        try {
            console.log(this.service)
            const response = await new this.service().routine(req.body);

            res.status(201);
            res.type('application/json');
            res.send(response);

        } catch (err) {
            console.log(err);
            const error = {error: err};
            res.status(400);
            res.type('application/json');
            res.send(error);
        }

        
    }
}


export {CustomerAccount}