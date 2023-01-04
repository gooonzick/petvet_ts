import { useState } from 'react';

import { PetForm, Vaccinations } from '../../../models/models';
import { Field, Payload } from '../types';

const simpleFileds = ['name', 'specie', 'breed', 'sex', 'birthday', 'weight', 'color', 'sterilized', 'sterilizedDate'];

function usePetFormInput(initialValue: PetForm) {
  const [petForm, setPetForm] = useState(initialValue);

  const removeElement = (array: any[], index: number) => array.filter((_, i) => index !== i);

  const inputHandler = (name: Field, payload: Payload, operation: 'insert' | 'delete' = 'insert') => {
    if (simpleFileds.includes(name)) {
      setPetForm((prev) => ({ ...prev, [name]: payload }));
    }

    if (name === 'allergies') {
      if (operation === 'delete') {
        setPetForm((prev) => (
          {
            ...prev,
            allergies: removeElement(prev.allergies, Number(payload)),
          }));
        return;
      }
      setPetForm(
        (prev) => ({ ...prev, allergies: [...prev.allergies, payload as string] }),
      );
    }

    if (name === 'chronicDiseases') {
      if (operation === 'delete') {
        setPetForm((prev) => (
          {
            ...prev,
            chronicDiseases: removeElement(prev.chronicDiseases, Number(payload)),
          }));
        return;
      }
      setPetForm(
        (prev) => (
          {
            ...prev,
            chronicDiseases: [...prev.chronicDiseases, payload as string],
          }),
      );
    }

    if (name === 'vaccinations') {
      if (operation === 'delete') {
        setPetForm((prev) => (
          {
            ...prev,
            vaccinations: removeElement(prev.vaccinations, Number(payload)),
          }
        ));
        return;
      }
      setPetForm(
        (prev) => ({ ...prev, vaccinations: [...prev.vaccinations, payload as Vaccinations] }),
      );
    }
  };

  return {
    petForm,
    inputHandler,
  };
}

export default usePetFormInput;
