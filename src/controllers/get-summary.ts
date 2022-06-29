import { Request, Response } from "express";
import {GetTransactionsSummary} from '../services';
import {ExceptionTreatment} from '../utils';

class GetSummaryController {

    private service = GetTransactionsSummary;

    public async create (req: Request, res: Response) {

        console.log(req.body);
        console.log(req.originalUrl);

        try {
            console.log(this.service)
            const response = await new this.service().routine(req);

            //TODO uuid should come from db and then be validated (or not) so to be appended on the response

            if (response.messages.length === 0){
                res.status(200);
                res.type('application/json');
                res.send(response.data);
            } else {
                //const error = new ExceptionTreatment(response);
                console.log("erro flux" + response.messages)
                console.log(typeof response.messages)
                let error = new ExceptionTreatment(response).errorList
                res.status(400);
                res.type('application/json');
                res.send({Errors: error});

                //throw new Error(response.messages[0]);
            }

        } catch (err) {
            // TODO improve error handling
            console.log(err);
            console.log(typeof err)
            // const errorLog = String(err).trim().split("|");
            // console.log(errorLog);
            // const error = {error: err};
            res.status(500);
            res.type('application/json');
            res.send({Error: `${String(err).split(": ")[1]}`});
        }

        
    }
}


export {GetSummaryController};