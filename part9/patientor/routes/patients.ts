import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});


router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);
  res.json(patientService.addPatient(newPatient));
});



export default router;