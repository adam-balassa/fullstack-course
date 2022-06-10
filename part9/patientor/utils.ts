import { Entry, Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isArray = (array: unknown): array is unknown[] => {
    return array instanceof Array;
};

const parseString = (text: unknown, field: string): string => {
    if (!text || !isString(text)) {
      throw new Error(`Incorrect or missing ${field}`);
    }
  
    return text;
};

const parseStringArray = (array: unknown): string[] => {
    if (!array || !isArray(array)) {
      throw new Error(`Incorrect or missing array`);
    }
    return array.map(el => parseString(el, 'array element'));
};

const parseEntryType = (text: unknown): Entry['type'] => {
    const str = parseString(text, 'type');
    switch (str) {
        case 'Hospital': return 'Hospital';
        case 'HealthCheck': return 'HealthCheck';
        case 'OccupationalHealthcare': return 'OccupationalHealthcare';
        default: throw new Error(`Incorrect type`);
    }
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): Date => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return new Date(date);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseHealthCheckrating = (healthCheckRating: unknown): HealthCheckRating => {
    if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing HealthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (param: any): { date: string, criteria: string } => {
    return {
        date: parseDate(param.date).toString(),
        criteria: parseString(param.criteria, 'criteria')
    };
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientFields): NewPatient => ({
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: []
});

type EntryFields = { 
    description: unknown, 
    date: unknown, 
    specialist: unknown, 
    diagnosisCodes: unknown,
    type: unknown,
    healthCheckRating: unknown,
    employerName: unknown,
    sickLeave: unknown,
    discharge: unknown,
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
    const newEntry = {
        description: parseString(entry.description, 'description'),
        date: parseString(entry.date, 'date'), 
        specialist: parseString(entry.specialist, 'specialist'),
        diagnosisCodes: entry.diagnosisCodes ? parseStringArray(entry.diagnosisCodes) : undefined
    };
    const type = parseEntryType(entry.type);
    switch (type) {
        case 'HealthCheck':
            return {...newEntry, type, healthCheckRating: parseHealthCheckrating(entry.healthCheckRating)};
        case 'OccupationalHealthcare':
            return {...newEntry, 
                type, 
                employerName: parseString(entry.employerName, 'employerName'),
                sickLeave: entry.sickLeave as {startDate: string, endDate: string}
            };        
        case 'Hospital':
            return {...newEntry, type, discharge: parseDischarge(entry.discharge)};
    }
    
    
} ;
