import { Photo } from "./photo"

export interface Member {
    id: number
    userName: string
    photoUrl: string
    age: number
    knownAs: string
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    lastActive: string
    created: string
    photos: Photo[]
  }
