export type Dog = {
    dog_id?: number;
    name: string; 
    breed: string;
    size: Size;
    sex: Sex;
    altered: boolean;
    weight: number;
    age: number
}

export type Size = "s" | "m" | "l"

export type Sex = "m" | "f"