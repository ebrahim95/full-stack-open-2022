import { Gender, newPatientNoID, Entry } from '../types';

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


const isType = (entries: object): entries is Entry[] => {
  if (Array.isArray(entries) && entries.length !== 0) {

    const type_array = entries.map(obj => {
      return obj.type as string;
    });


    for (const value of type_array) {
      if (!value && isString(value) && !['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(value)) {
        return false;
      }
    }
  }
  return true;
};

const parseEntry = (entries: unknown): Entry[] => {

  if (!entries || !isType(entries)) {
    throw new Error('entries is incorrect or missing');
  }

  return entries;
};

const checkNewPatientEntry = (object: unknown): newPatientNoID => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newEntry: newPatientNoID = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntry(object.entries)
    };

    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default checkNewPatientEntry;
