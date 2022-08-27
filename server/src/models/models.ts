import { Pet, Vaccination } from '@prisma/client';
import { Request } from 'express';

export interface SignUpForm {
    email?: string,
    password?: string,
    username?: string,
    phone?: string,
    userGroupId: any,
}

export interface IPetForm extends Pet {
    allergies: String[],
    chronicDiseases: String[],
    vaccinations: Vaccination[],
}

export interface CustomRequest<T> extends Request {
    body: T
}
