import {
    AccountDigitValidator,
    AccountValidator,
    AgencyDigitValidator,
    AgencyValidator
} from './string-validators';
import { Transaction } from '../models';

class SummaryDataValidation {
    public transaction: Partial<Transaction>;
    public errors: string;

    private accountDigitValidator = AccountDigitValidator;
    private accountValidator = AccountValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private agencyValidator = AgencyValidator;

    public constructor(transaction: Partial<Transaction>) {
        this.errors = "";
        this.transaction = this.validate(transaction);
    }

    private validate(transaction: Partial<Transaction>): Partial<Transaction> {

        const validAccountDigit = new this.accountDigitValidator(transaction.acverifier);
        const validAccount = new this.accountValidator(transaction.account);
        const validAgencyDigit = new this.agencyDigitValidator(transaction.agverifier);
        const validAgency = new this.agencyValidator(transaction.agency);



        this.errors = this.errors.concat(`${validAccountDigit.errors}${validAccount.errors}${validAgencyDigit.errors}${validAgency.errors}`);

        const validatedTransaction: Partial<Transaction> = {
            account: validAccount.account,
            acverifier: validAccountDigit.digit,
            agency: validAgency.agency,
            agverifier: validAgencyDigit.digit
        };

        return validatedTransaction;
    }
}

export { SummaryDataValidation };