import { ApiResponse } from '../models';

class ExceptionTreatment {
    public errorList: Array<string> = [];

    public constructor(error: ApiResponse){
        const captured_errors = error.messages;

        captured_errors.forEach(element => {
            if(typeof element === "string"){
                if (element.length > 0){
                    let key_value = element.split(": ");
                    this.errorList.push(`{${key_value[0]}: ${key_value[1]}}`)
                }
            } else {
                     
                let key_value = String(element).split(": ");
                // this.errorList.push(`{${key_value[0]}: ${key_value[1]}}`)
                throw new Error(key_value[1])           
            }


        });

    }
}

export { ExceptionTreatment };