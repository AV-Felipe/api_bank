class AgencyDigitValidator {
    public errors: string;
    public digit: string;

    public constructor(digit: string) {
        this.errors = "";
        this.digit = this.validate(digit);
    }

    private validate(digit: string): string {
        if (!(digit.length === 1)) {
            this.errors += `acdigit: invalid digit|`;

            return "";
        }

        return digit.trim();
    }
}

export { AgencyDigitValidator };