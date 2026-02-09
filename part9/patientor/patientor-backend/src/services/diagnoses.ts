import diagnoses from '../../data/diagnoses'
import { DiagnoseEntery } from '../types';

function getAllDiganoses(): DiagnoseEntery[] {
        return diagnoses;
}

export default {
        getAllDiganoses
}
