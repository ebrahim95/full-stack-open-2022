import { noSSN, newPatientNoID, Patient } from "../types";
import patients from "../data/patients";
import { v4 as uuid } from 'uuid';

const getPatientsData = (): noSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addPatient = (newPatientEntry: newPatientNoID): Patient => {
  const id: string = uuid();
  const enterPatient = {
    id,
    ...newPatientEntry
  };
  patients.push(enterPatient);
  return enterPatient;
};

export default {
  getPatientsData,
  addPatient
};
