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
    dtg: Date | null;
    location: string;
    direction: string;
    speed: string;
    criticality: string;
    supportNeeded: string;
    weather: string;
    destinationTime: Date| null;
    identification: string;
    nameOfShip: string;
    typeOfActivity: string;
    significance: string;
    latitude: number | null;
    longitude: number | null;
    additionalInformation: string;

}

export class Login {
    emailId!: string;
    password!: string;
}
