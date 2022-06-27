import {
    CpfValidator,
    DateValidator,
    EmailValidator,
    NameValidator,
    UuidValidator
} from './string-validators';
import { Customer } from '../models';

class CustomerDataValidation {
    public user: Partial<Customer>;
    public errors: string;

    private cpfValidator = CpfValidator;
    private dateValidator = DateValidator;
    private emailValidator = EmailValidator;
    private nameValidator = NameValidator;
    private uuidValidator = UuidValidator;

    public constructor(customer: Customer) {
        this.errors = "";
        this.user = this.validate(customer);
    }

    private validate(customer: Customer): Partial<Customer> {

        const validCpf = new this.cpfValidator(customer.cpf);
        const validDate = new this.dateValidator(customer.birthdate);
        const validEmail = new this.emailValidator(customer.email);
        const validName = new this.nameValidator(customer.name);
        const validUuid = new this.uuidValidator(customer.id);


        this.errors = this.errors.concat(`${validCpf.errors}${validDate.errors}${validEmail.errors}${validName.errors}${validUuid.errors}`);
        console.log("no verificador geral" + this.errors)
        const userData: Partial<Customer> = {
            cpf: validCpf.cpf,
            birthdate: validDate.date,
            email: validEmail.email,
            name: validName.name,
            id: validUuid.id
        };

        return userData;
    }
}

export {CustomerDataValidation};