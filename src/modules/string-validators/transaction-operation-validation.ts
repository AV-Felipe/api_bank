import { OperationStrings } from '../../types';

class TransactionOperationValidator {
    public errors: string;
    public operation: string;

    public constructor(operation: string) {
        this.errors = "";
        this.operation = this.validate(operation);
    }

    private validate(operation: string): string {
        if (!OperationStrings.includes(operation)) {
            this.errors += "operation: unrecognized operation|";

            return "";
        }

        return operation.trim();
    }
}

export { TransactionOperationValidator };