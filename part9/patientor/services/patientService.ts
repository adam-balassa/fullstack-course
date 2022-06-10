import patients from '../data/patients';
import { NewPatient, PublicPatient, Patient, NewEntry, Entry } from '../types';
import * as uuid from 'uuid';


const getNonSensitivePatients = (): PublicPatient[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth,gender, occupation }));
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient: Patient = { id: uuid.v1(), ...newPatient };
    patients.push(patient);
    return patient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
    const entry: Entry = { id: uuid.v1(), ...newEntry };
    patient.entries.push(entry);
    return entry;
};

export default {
    getNonSensitivePatients,
    addPatient,
    getPatientById,
    addEntry
};