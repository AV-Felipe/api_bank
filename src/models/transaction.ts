interface Transaction {
    agency: string,
    agverifier: string,
    account: string,
    acverifier: string,
    value: number,
    operation: string,
    accountid: string
}

export {Transaction};