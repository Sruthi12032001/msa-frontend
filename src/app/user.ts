export class User {
    id?: string
    firstName!: string
    lastName!: string
    age!: number
    emailId!: string
    password!: string
    address!: string
    pinCode!: string
    name?: string
    nameWithoutSpace?: string
    state!: string
}

export class Login {
    emailId!: string;
    password!: string;
}
