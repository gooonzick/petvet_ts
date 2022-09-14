import { Vaccination } from '@prisma/client';

export interface SignInForm {
  email: string,
  password: string,
}

export interface SignUpForm extends SignInForm {

  username: string,
  phone: string,
  userGroupId: any,
}

export interface IPetForm {
  id?: number,
  name: string,
  specie: string,
  breed: string,
  img?: string,
  sex: number,
  birthday: string,
  weight: string,
  color: string,
  sterilized: boolean,
  sterilizedDate: string,
  allergies: String[],
  chronicDiseases: String[],
  vaccinations: Vaccination[],
}

export interface isAuth {
  userId: number
  userGroup: number
}

export interface IDocFilterQuery {
  profileId: string
  categoryId: string
  userName: string
}
