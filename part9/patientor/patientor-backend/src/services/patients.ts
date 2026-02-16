import patients from '../../data/patients';
import { NewPatientEntery, NoSsnPatientEntery, PatientEntery } from '../types';
import { getNewId } from '../utils';

function getNoSsnPatients(): NoSsnPatientEntery[] {
        return patients.map(({ ssn, ...pateint }) => pateint);
}

function addEntery(patientEntery: NewPatientEntery): PatientEntery {
        const addedPatient: PatientEntery = patientEntery as PatientEntery;
        addedPatient.id = getNewId();
        patients.push(addedPatient);
        return addedPatient;
}

export default {
        getNoSsnPatients,
        addEntery
}
