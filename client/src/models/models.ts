export interface CustomError {
    data: {
      message: string
    }
    status: number
  }

export interface Pet {
  id?: number,
  name: string,
  specie: string,
  breed: string,
  img?: string,
  sex: boolean,
  birthday: Date | null,
  weight: number,
  color: string,
  sterilized: boolean,
  sterilizedDate?: boolean,
  allergies: [],
  chronicDiseases: [],
  vaccinations: [],
  }

export interface User {
    name: string
    email:string
    phone: string
    img:string
    userGroupId: number
    pets: Pet[]
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

export interface Vaccinations {
  description: string
  drugName: string
  drugDate: Date | null
}
