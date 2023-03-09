import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientsService.getPatientsData());
});

export default router;
