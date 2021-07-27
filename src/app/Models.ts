export type AddExpenditure = {
    amount: string;
    description: string;
    division: string;
    category: string;
    date: string;
}

export type AddIncome = {
    amount: string;
    description: string;
    date: string
}

export type getExpenditure = {
    from: string;
    to: string;
    division: string;
    category: string;
}

export type getIncome = {
    from: string;
    to: string;
}