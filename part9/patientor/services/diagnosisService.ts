import diagnosisData from '../data/diagnosis.json';
import { Diagnose } from '../types';


const diagnosis: Diagnose[] = diagnosisData as Diagnose[];


const getDiagnosis = (): Diagnose[] => {
    return diagnosis;
};

export default {
    getDiagnosis
};