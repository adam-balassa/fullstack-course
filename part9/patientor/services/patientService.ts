import patientData from '../data/patients.json';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import * as uuid from 'uuid';
import { toNewPatient } from '../utils';


const patients: Patient[] = patientData.map(patient => {
    const newPatient: Patient = toNewPatient(patient) as Patient;
    newPatient.id = patient.id;
    return newPatient;
});

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth,gender, occupation }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient: Patient = { id: uuid.v1(), ...newPatient };
    patients.push(patient);
    return patient;
};

export default {
    getNonSensitivePatients,
    addPatient
};