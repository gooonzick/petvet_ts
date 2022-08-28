import { Vaccination } from '@prisma/client';
import { Request } from 'express';

export interface SignUpForm {
    email?: string,
    password?: string,
    username?: string,
    phone?: string,
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

export interface CustomRequest<T> extends Request {
    body: T
}
