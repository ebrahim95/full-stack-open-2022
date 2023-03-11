import { Gender, newPatientNoID } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(p => p.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('incorrent gender' + gender);
  }

  return gender;
};


const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('name is incorrect or missing');
  }

  return name;
};
const parseDateOfBirth = (DOB: unknown): string => {
  if (!DOB || !isString(DOB)) {
    throw new Error('DOB is incorrect or missing');
  }

  return DOB;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('ssn is incorrect or missing');
  }

  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('occupation is incorrect or missing');
  }

  return occupation;
};


const checkNewPatientEntry = (object: unknown): newPatientNoID => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: newPatientNoID = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default checkNewPatientEntry;
