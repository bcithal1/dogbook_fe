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

export type Size = "s" | "m" | "l"

export type Sex = "m" | "f"