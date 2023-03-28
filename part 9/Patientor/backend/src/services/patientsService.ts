import { noSSN, newPatientNoID, Patient } from "../types";
import patients from "../data/patients";
import { v4 as uuid } from 'uuid';


const patientsNoSSN: noSSN[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  };
});

const getPatientsData = (): noSSN[] => {
  return patientsNoSSN;
};
const getPatientsDataId = (id: string) => {
  return patients.find(patient => patient.id == id);
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
  addPatient,
  getPatientsDataId
};
