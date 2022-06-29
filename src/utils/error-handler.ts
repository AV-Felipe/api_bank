import { ApiResponse } from '../models';

class ExceptionTreatment {
    public errorList: Array<string> = [];

    public constructor(error: ApiResponse) {
        const captured_errors = error.messages;

        captured_errors.forEach(element => {

            // treatment for validation errors
            if (typeof element === "string") {
                if (element.length > 0) {
                    let key_value = element.split(": ");
                    this.errorList.push(`${key_value[0]}: ${key_value[1]}`)
                }
            } else {
                // treatment for database errors
                let key_value = String(element).split(": ");
                throw new Error(key_value[1])
            }


        });

    }
}

export { ExceptionTreatment };