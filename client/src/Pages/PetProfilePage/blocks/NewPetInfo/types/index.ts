export type NewRecordType = 'visit' | 'allergy' | 'chronicDiseases' | 'vaccinations';

export type NewAllergyDisease = {
  name: string
};

export type NewVist = {
  visitDate: Date;
  description: string;
  diagnose: string;
  treatment: string;
};

export type NewVac = {
  description: string;
  drugName: string;
  drugDate: Date;
};

export type NewRecord = NewVac | NewVist | NewAllergyDisease;
