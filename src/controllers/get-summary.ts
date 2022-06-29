import { Request, Response } from "express";
import { GetTransactionsSummary } from '../services';
import { ExceptionTreatment } from '../utils';
import { ApiResponse } from '../models'

class GetSummaryController {

    private service = GetTransactionsSummary;

    public async create(req: Request, res: Response) {

        try {

            const response = await new this.service().routine(req);

            if (response.messages.length === 0) {
                res.status(200);
                res.type('application/json');
                res.send(response);
            } else {
                // Return validation errors
                let error = new ExceptionTreatment(response).errorList
                response.messages = error;
                res.status(400);
                res.type('application/json');
                res.send(response);
            }

        } catch (err) {
            // Return custom database error responses
            const response: ApiResponse = { data: "", messages: [] };
            response.messages.push("db error")
            res.status(500);
            res.type('application/json');
            res.send(response);
        }


    }
}


export { GetSummaryController };