import pateints from '../../data/patients';
import { NoSsnPatientEntery } from '../types';

function getNoSsnPatients(): NoSsnPatientEntery[] {
        return pateints.map(({ ssn, ...pateint }) => pateint);
}

export default {
        getNoSsnPatients,
}
