class NameValidator {
    public errors: string;
    public name: string;
    private regex = /^[a-z]+$/;

    public constructor(name: string) {
        this.errors = "";
        this.name = this.validate(name);
    }

    private validate(name: string): string {
        if (!name) {
            this.errors += "name: field required|";

            return "";
        }

        if (name.length < 3) {
            this.errors += "name: name too short|";

            return "";
        }

        if (!this.regex.test(name)) {
            this.errors += "name: invalid characters use only a-z lowercase|";

            return "";
        }

        if (!name.trim()) {
            this.errors += "name: cannot be only space characters|";

            return "";
        }

        return name.trim();
    }
}

export { NameValidator };