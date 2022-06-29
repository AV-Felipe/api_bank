class AgencyValidator {
    public agency: string;
    public errors: string;
    // eslint-disable-next-line prefer-named-capture-group
    private regex = /^[-+]?(\d+)$/;

    public constructor(account: string) {
        this.errors = "";
        this.agency = this.validate(account);
    }

    private validate(agency: string): string {

        if (agency.length === 0) {
            this.errors += "agency: agency required|";

            return "";
        }

        if (!this.regex.test(agency)) {
            this.errors += "agency: invalid agency|";

            return "";
        }

        return agency.trim();
    }
}

export { AgencyValidator };