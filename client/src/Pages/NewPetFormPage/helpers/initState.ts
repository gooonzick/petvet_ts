import { PetForm } from '../../../models/models';

const initState: PetForm = {
  name: '',
  specie: '',
  breed: '',
  sex: 0,
  birthday: null,
  weight: '',
  color: '',
  sterilized: false,
  allergies: [],
  chronicDiseases: [],
  vaccinations: [],
};

export default initState;
