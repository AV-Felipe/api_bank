class AccountValidator {
    public account: string;
    public errors: string;

    private regex = /^[0-9]*$/;

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