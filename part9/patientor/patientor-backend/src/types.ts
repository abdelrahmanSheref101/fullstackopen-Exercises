import { z } from 'zod';
import { NewPatientSchema } from './utils';

export interface DiagnoseEntery {
        code: string;
        name: string;
        latin?: string;
}

export enum Gender {
        Male = 'male',
        Female = 'female',
        Other = 'other',
}

export type NewPatientEntery = z.infer<typeof NewPatientSchema>;

export interface PatientEntery extends NewPatientEntery {
        id: string;
}






export type NoSsnPatientEntery = Omit<PatientEntery, 'ssn'>;
