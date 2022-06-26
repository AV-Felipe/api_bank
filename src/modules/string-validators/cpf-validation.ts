class CpfValidator {
    public cpf: string;
    public errors: string;

    public constructor(cpf: string) {
        this.errors = "";
        this.cpf = this.validate(cpf);
    }

    private validate(cpf: string): string {

        if (cpf.length < 11) {
            this.errors += "cpf: cpf required|";

            return "";
        }

        if (cpf.length > 11) {
            this.errors += "cpf: only numbers|";

            return "";
        }

        if (!this.deepValidation(cpf)){
            this.errors += "cpf: fake cpf|";

            return "";
        }

        return cpf.trim();
    }

    private deepValidation(strCPF: string) {
        
        let digitsSum;
        let digitsRemainder;
        digitsSum = 0;
        if (strCPF == "00000000000") return false;
    
        for (let i=1; i<=9; i++){
            digitsSum = digitsSum + parseInt(strCPF.substring(i-1, i)) * (11 - i)
        };

        digitsRemainder = (digitsSum * 10) % 11;
    
        if ((digitsRemainder == 10) || (digitsRemainder == 11))  digitsRemainder = 0;
        if (digitsRemainder != parseInt(strCPF.substring(9, 10)) ) return false;
    
        digitsSum = 0;

        for (let i = 1; i <= 10; i++){
            digitsSum = digitsSum + parseInt(strCPF.substring(i-1, i)) * (12 - i)
        };

        digitsRemainder = (digitsSum * 10) % 11;
    
        if ((digitsRemainder == 10) || (digitsRemainder == 11))  digitsRemainder = 0;
        if (digitsRemainder != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
        
    }
}

export { CpfValidator };