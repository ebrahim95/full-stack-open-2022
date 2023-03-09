import diagnose from '../data/diagnoses';
import { Diagnose } from '../types';


const getDiagnoseData = (): Diagnose[] => {
  return diagnose;
};

export default { getDiagnoseData };
