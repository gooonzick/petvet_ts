import { NewVac } from '../types';

export const prepareNewVacQuery = (data: NewVac, petId: number) => ({
  description: data.description,
  drugDate: data.drugDate?.toDate(),
  drugName: data.drugName,
  petId,
});
