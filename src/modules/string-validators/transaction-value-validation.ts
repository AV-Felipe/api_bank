class TransactionValueValidator {
    public value: number;
    public errors: string;

    public constructor(value: number) {
        this.errors = "";
        this.value = this.validate(value);
    }

    private validate(value: number): number {

        if (value <= 0) {
            this.errors += "value: value must be higher than 0|";

            return NaN;
        }

        if (!Number.isInteger(value)){

            this.errors += "value: value must be expressed in cents as a integer|";

            return NaN;
        }

        return value;
    }
}

export { TransactionValueValidator };