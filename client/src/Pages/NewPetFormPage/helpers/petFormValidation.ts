import { PetForm } from '../../../models/models';

export const pageOneValidation = (state: PetForm) => {
  if (
    state.name === ''
   || state.specie === ''
   || state.breed === ''
   || state.weight === ''
   || state.color === ''
  ) {
    return false;
  }
  return true;
};

export const pageTwoValidation = (state: PetForm) => {
  if (!state.sterilized) {
    return false;
  }
  if (state.sterilized && !state.sterilizedDate) {
    return false;
  }
  return true;
};
