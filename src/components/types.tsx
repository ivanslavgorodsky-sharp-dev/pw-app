export type User = {
    name: string,
    balance: number,
    id: number,
    email: string,
}

export type Transaction = {
    id: string,
    date: string,
    username: string,
    amount: number,
    balance: number,
}

type AppProps = {
    isLoading: boolean,
    lastError: string,
    token: string,
    user: User,
    transactions: Array<Transaction>,
    login (email: string, password: string): Promise<string>,
    save (name: string, value: string): void,
    remove (name: string): void,
    userInfo (token: string): Promise<string>,
    getTransactions (token: string): Promise<string>,
    registerUser (name: string, email: string, password: string): Promise<string>,
    searchUser(token: string, filter: string): Promise<[]>,
    newTransaction (token: string, recipient: string, amount: number): Promise<string>,
  };

  export default AppProps;
