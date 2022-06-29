class DateValidator {
    public date: string;
    public errors: string;

    private regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    public constructor(date: string) {
        this.errors = "";
        this.date = this.validate(date);
    }

    private validate(date: string): string {

        if (!date) {
            this.errors += "birthdate: birthdate required|";

            return "";
        }

        if (!this.regex.test(date)) {
            this.errors += "birthdate: must be a valid date in the yyyy-mm-dd format|";

            return "";
        }

        if (!new Date(date).getTime()) {
            this.errors += "birthdate: invalid date|";

            return "";
        }

        return date.trim();
    }
}

export { DateValidator };