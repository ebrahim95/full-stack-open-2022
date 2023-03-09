import { noSSN } from "../types";
import patients from "../data/patients";

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

export default {
  getPatientsData
};
