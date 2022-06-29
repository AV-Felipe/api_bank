class AccountValidator {
    public account: string;
    public errors: string;
    // eslint-disable-next-line prefer-named-capture-group
    private regex = /^[-+]?(\d+)$/;

    public constructor(account: string) {
        this.errors = "";
        this.account = this.validate(account);
    }

    private validate(account: string): string {

        if (account.length === 0) {
            this.errors += "account: account required|";

            return "";
        }

        if (!this.regex.test(account)) {
            this.errors += "account: invalid account|";

            return "";
        }

        return account.trim();
    }
}

export { AccountValidator };