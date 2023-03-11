import express from 'express';
import patientsService from '../services/patientsService';
import checkNewPatientEntry from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientsService.getPatientsData());
});

router.post('/', (req, res) => {
  console.log(req.body);
  const newPatient = checkNewPatientEntry(req.body);
  const addEntry = patientsService.addPatient(newPatient);
  res.json(addEntry);
});
export default router;
