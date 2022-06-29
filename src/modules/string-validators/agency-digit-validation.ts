class AgencyDigitValidator {
    public errors: string;
    public digit: string;

    private regex = /^[0-9]*$/;

    public constructor(digit: string) {
        this.errors = "";
        this.digit = this.validate(digit);
    }

    private validate(digit: string): string {
        if (!(digit.length === 1)) {
            this.errors += `agdigit: invalid digit length|`;

            return "";
        }

        if (!this.regex.test(digit)) {
            this.errors += "agdigit: use only numbers|";

            return "";
        }

        return digit.trim();
    }
}

export { AgencyDigitValidator };