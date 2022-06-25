import { Request, Response } from "express";

class CustomerAccount {
    constructor (req: Request, res: Response) {
        //TODO:
        // manda a req para o serviço de criação de conta
        // aguarda o retorno do serviço de criação de conta
        // responde para o usuário se criou ou deu erro
        console.log(req);

        const my_saying = {felipe: "lindo"}
        
        res.status(200)
        res.type('application/json')
        res.send(my_saying)
    }
}


export {CustomerAccount}