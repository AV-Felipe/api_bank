class DateValidator {
    public date: string;
    public errors: string;

    public constructor(date: string) {
        this.errors = "";
        this.date = this.validate(date);
    }

    private validate(date: string): string {
        console.log(date)
        console.log(new Date(date).getTime())
        if (!date) {
            this.errors += "birthdate: birthdate required|";

            return "";
        }

        if (date.length < 10){
            this.errors += "birthdate: invalid date format, must be yyyy-mm-dd|"
            
            return "";
        }

        if (!new Date(date).getTime()) {
            this.errors += "birthdate: invalid date|";

            return "";
        }
        console.log("no verificador de data" + this.errors)
        return date.trim();
    }
}

export { DateValidator };