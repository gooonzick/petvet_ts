import { Pet } from '../models/models';

export const pageOneValidation = (state: Pet) => {
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

export const pageTwoValidation = (state: Pet) => {
  if (!state.sterilized) {
    return false;
  }
  if (state.sterilized && !state.sterilizedDate) {
    return false;
  }
  return true;
};
