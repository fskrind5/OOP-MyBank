#!/usr/bin/env node

import inquirer from "inquirer";

//* Bank Account Interface

interface bankAccount {
    accountNumber: number;
    balance: number;
    withdraw (amount: number): void;
    deposit (amount: number): void;
    checkbalance(): void;
}

//* Bank Account Class

class BankAccount implements bankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`You have withdrawn $${amount}. Your remaining balance is $${this.balance}.`);
        } else {
            console.log(`Insufficient funds`);
        }
    }

    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`You have deposited $${amount}. Your new balance is $${this.balance}.`);
    }

    checkbalance(): void {
        console.log(`Your balance is $${this.balance}.`);
    }
}

//* Customer Class

class Customer {
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : number;
    account: BankAccount;

    constructor ( firstName : string, lastName : string, gender : string, age: number, mobileNumber:number, account : BankAccount,)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

//* Create Bank Accounts

const accounts : BankAccount [] = [
    new BankAccount(1001, 9000),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];

//* Create Customers

const customers : Customer[] = [
    new Customer ("Bruce", "Wayne", "Male", 34, 90078601 ,accounts[0]),
    new Customer ("Clark", "Kent", "Male", 36, 90078602 ,accounts[1]),
    new Customer ("Diana", "Prince", "Female", 32, 90078603 ,accounts[2])
]

//* Function to interact with bank accounts

async function service () {
    do {
        const accountNumberInput = await inquirer.prompt (
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        )

        const customer = customers.find(customers => customers.account.accountNumber === accountNumberInput.accountNumber)

        if (customer) {
            console.log (`Welcome, ${customer.firstName} ${customer.lastName}`)

            const ans = await inquirer.prompt ([
                {
                    name: "select",
                    type: "list",
                    message: "What would you like to do?",
                    choices: [
                        "Check Balance",
                        "Withdraw",
                        "Deposit",
                        "Exit"
                    ]
                }
            ]);

            switch (ans.select) {
                case "Check Balance":
                    customer.account.checkbalance();
                    break;

                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt ([
                        {
                            name: "amount",
                            type: "number",
                            message: "How much would you like to withdraw?"
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;

                case "Deposit":
                    const depositAmount = await inquirer.prompt ([
                        {
                            name: "amount",
                            type: "number",
                            message: "How much would you like to deposit?"
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Exit":
                    console.log ("Thank you for banking with us. Have a nice day!");
                    return;
            }
        } else {
            console.log ("Invalid account number. Please try again.");
        }
    } 
    while (true)
}

service();