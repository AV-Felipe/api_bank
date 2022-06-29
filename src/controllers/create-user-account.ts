import { Request, Response } from "express";
import {CreateCustomerAccount} from '../services';
import {ExceptionTreatment} from '../utils';
import {ApiResponse} from '../models'

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

            //TODO uuid should come from db and then be validated (or not) so to be appended on the response

            if (response.messages.length === 0){
                res.status(201);
                res.type('application/json');
                res.send(response);
            } else {
                //const error = new ExceptionTreatment(response);
                console.log("erro flux" + response.messages)
                console.log(typeof response.messages)
                let error = new ExceptionTreatment(response).errorList
                response.messages = error;
                res.status(400);
                res.type('application/json');
                res.send(response);

                //throw new Error(response.messages[0]);
            }

        } catch (err) {
            // TODO improve error handling
            console.log(err);
            console.log(typeof err)
            // const errorLog = String(err).trim().split("|");
            // console.log(errorLog);
            // const error = {error: err};
            const response: ApiResponse = {data: "", messages: []};
            response.messages.push(String(err).split(": ")[1])
            res.status(500);
            res.type('application/json');
            res.send(response);
        }

        
    }
}


export {CustomerAccount}