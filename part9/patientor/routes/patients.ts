import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});


router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);  
  if (patient) res.json(patient);
  else res.status(404).json({error: 'Patient not found'});
});


router.post('/', (req, res) => {
  try {  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (e) {
    if (e instanceof Error) res.status(400).json({error: e.message});
    throw e;
  }
});


router.post('/:id/entries', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) res.status(400).json({error: 'Patient not found'});
  else {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      patientService.addEntry(patient, toNewEntry(req.body));
      res.json(patient);
    } catch (e) {
      if (e instanceof Error) res.status(400).json({error: e.message});
      throw e;
    }
  }
});

export default router;