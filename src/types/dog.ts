export type Dog = {
    id?: number;
    name: string; 
    breed: string;
    size: Size;
    sex: Sex;
    altered: boolean;
    weightLbs: number;
    age: number
}

export enum Size {
    TEACUP = "TEACUP",
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    X_LARGE = "X_LARGE"
}

export enum Sex {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Altered{
    YES = "YES",
    NO = "NO"
}