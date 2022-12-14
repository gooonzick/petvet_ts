export interface CustomError {
  data: {
    message: string
  }
  status: number
}

export interface Vaccinations {
  id?: number
  description: string
  drugName: string
  drugDate: string | null
}

export interface Visit {
  id: number
  docId: number
  userId: number
  visitDate: Date
  description: string
  diagnose: string
  treatment: string
  petId: number
  createdAt: Date
  updatedAt: Date
}

export interface ChronicDiseaseAllergy {
  id: number
  name: string
}

export interface Pet {
  id?: number,
  name: string,
  specie: string,
  breed: string,
  img?: string,
  sex: number,
  birthday: string | null,
  weight: string,
  color: string,
  sterilized: boolean,
  sterilizedDate?: string,
  allergies: ChronicDiseaseAllergy[],
  chronicDiseases: ChronicDiseaseAllergy[],
  vaccinations: Vaccinations[],
  visits?: Visit[]
}

export type PetForm = Omit<Pet, 'chronicDiseases' | 'allergies' | 'vaccinations' | 'visits'> & {
  allergies: string[],
  chronicDiseases: string[],
  vaccinations: Vaccinations[],
};

export interface User {
  id: number
  name: string
  email:string
  phone: string
  img:string
  userGroupId: number
  pets: Pet[]
}

export interface PriceList {
  id: number
  service: string
  price: number
}

export interface Category {
  category: {
    id: number
    name: string
  }
}

export interface Profile {
  profile: {
    id: number
    name: string
  }
}

export interface Doctor extends User {
  docInfo: {
    id: number
    experience: string
    clinicAddress: string
  }
  priceList: PriceList[]
  categories: Category[]
  profiles: Profile[]
  docSchedules: Scheules[]
}

export interface UserResponse {
  user: User
  token: string
}

export interface SigninRequest {
  email: string
  password: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
  phone: string
  userGroupId: number
}

export interface CatergoryProfile {
  id: number
  name: string
}

export interface Scheules {
  id: number
  dateOfReceipt: string
  pet?: {
    id: number
    name: string
    specie: string
  }
  user?: {
    id: number
    name?: string
    phone?: string
  }
  docId: number;
  userId: number | null;
  petId: number | null;
  isClose: boolean;
  createdAt: Date;
  updatedAt: Date;
}
