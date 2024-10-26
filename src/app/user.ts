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

export interface ShipInfo {
    id?: string;
    from_: string;
    to: string;
    dtg: string;
    location: string;
    direction: string;
    speed: string;
    criticality: string;
    supportNeeded: string;
    weather: string;
    destinationTime: string;
    identification: string;
    nameOfShip: string;
    typeOfActivity: string;
    significance: string;
    latitude: number | null;
    longitude: number | null;
    additionalInformation: string;
    severity: boolean;
    supportNeededBool: boolean;

}

export class Login {
    emailId!: string;
    password!: string;
}

export interface payload {
    id?: string | null;
    from_: string | null;
    to: string | null;
    location: string | null;
    nameOfShip: string| null;
    severity: boolean | null;
    supportNeededBool: boolean | null;
}