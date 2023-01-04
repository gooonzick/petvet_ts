import { NewVisitData } from '../types';

export const prepareNewVisitQuery = (data: NewVisitData, petId: number) => ({
  visitDate: data.visitDate!.toDate(),
  description: data.diagnose,
  diagnose: data.diagnose,
  treatment: data.treatment,
  petId,
});
