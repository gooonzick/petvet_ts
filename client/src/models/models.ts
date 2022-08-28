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
  sex: number,
  birthday: string | null,
  weight: string,
  color: string,
  sterilized: boolean,
  sterilizedDate?: string,
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
  drugDate: string | null
}
