import { Dog } from "./dog"
export type DogProfile = {
    id?: number,
    profilePhotoId: number,
    bannerPhotoId?: number,
    dog: Dog,
    temperament: string,
    bio: string
}