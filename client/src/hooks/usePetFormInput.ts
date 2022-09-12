import React, { ChangeEvent, useState } from 'react';
import { PetForm, Vaccinations } from '../models/models';

function usePetFormInput(initialValue: PetForm) {
  const [petForm, setPetForm] = useState(initialValue);
  const simpelInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPetForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const arrayInputHandler = (e: ChangeEvent<HTMLInputElement> & KeyboardEvent, key: 'vaccinations' | 'chronicDiseases' | 'allergies') => {
    if (e.keyCode === 13) {
      setPetForm(
        (prev) => ({ ...prev, [key]: [...prev[key], e.target.value] }),
      );
      e.target.value = '';
    }
  };

  const removeFromArray = (property: 'vaccinations' | 'chronicDiseases' | 'allergies', removeIndex: number) => {
    setPetForm(
      (prev) => (
        {
          ...prev,
          [property]: prev[property].filter((_, index) => index !== removeIndex),
        }
      ),
    );
  };

  const objectInputHandler = (property: 'vaccinations' | 'chronicDiseases' | 'allergies', obj: Vaccinations) => {
    setPetForm(
      (prev) => ({ ...prev, [property]: [...prev[property], obj] }),
    );
  };

  return {
    petForm, simpelInputHandler, arrayInputHandler, removeFromArray, objectInputHandler,
  };
}

export default usePetFormInput;
