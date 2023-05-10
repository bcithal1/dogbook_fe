export type BreedInfo = {
    weight: Weight,
    height: Height,
    id: number,
    name: string, 
    bred_for: string,
    breed_group: string, 
    life_span: string, 
    temperament: string, 
    origin: string
}

type Weight = {
    imperial: string
}

type Height = {
    imperial: string
}