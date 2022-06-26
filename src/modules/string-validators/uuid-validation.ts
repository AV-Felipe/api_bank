class UuidValidator {
    public errors: string;
    public id: string;
    // eslint-disable-next-line prefer-named-capture-group
    private regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    public constructor(uuid: string) {
        this.errors = "";
        this.id = this.validate(uuid);
    }

    private validate(uuid: string): string {
        if (!uuid) {
            this.errors += "id: field required|";

            return "";
        }

        if (!this.regex.test(uuid)) {
            this.errors += "id: invalid id|";

            return "";
        }

        return uuid.trim();
    }
}

export { UuidValidator };