import {
    AccountDigitValidator,
    AccountValidator,
    AgencyDigitValidator,
    AgencyValidator,
    TransactionOperationValidator,
    TransactionValueValidator
} from './string-validators';
import { Transaction } from '../models';

class TransactionDataValidation {
    public transaction: Partial<Transaction>;
    public errors: string;

    private accountDigitValidator = AccountDigitValidator;
    private accountValidator = AccountValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private agencyValidator = AgencyValidator;
    private transactionOperationValidator = TransactionOperationValidator;
    private transactionValueValidator = TransactionValueValidator;

    public constructor(transaction: Partial<Transaction>) {
        this.errors = "";
        this.transaction = this.validate(transaction);
    }

    private validate(transaction: Partial<Transaction>): Partial<Transaction> {

        const validAccountDigit = new this.accountDigitValidator(transaction.acverifier);
        const validAccount = new this.accountValidator(transaction.account);
        const validAgencyDigit = new this.agencyDigitValidator(transaction.agverifier);
        const validAgency = new this.agencyValidator(transaction.agency);
        const validOperation = new this.transactionOperationValidator(transaction.operation);
        const validValue = new this.transactionValueValidator(transaction.value);



        this.errors = this.errors.concat(`${validAccountDigit.errors}${validAccount.errors}${validAgencyDigit.errors}${validAgency.errors}${validOperation.errors}${validValue.errors}`);

        const validatedTransaction: Partial<Transaction> = {
            account: validAccount.account,
            acverifier: validAccountDigit.digit,
            agency: validAgency.agency,
            agverifier: validAgencyDigit.digit,
            operation: validOperation.operation,
            value: validValue.value
        };

        return validatedTransaction;
    }
}

export { TransactionDataValidation };