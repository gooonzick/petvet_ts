import { Vaccinations } from '@/models/models';

export type Field = string | 'allergies' | 'chronicDiseases' | 'vaccinations' | 'name' | 'specie' | 'breed' | 'img' | 'sex' | 'birthday' | 'weight' | 'color' | 'sterilized' | 'sterilizedDate';

export type Payload = string | Vaccinations | number | boolean;

export type InputFunc = (name: Field, payload: Payload, operation?: 'insert' | 'delete') => void;
