export interface DiagnoseEntery {
        code: string;
        name: string;
        latin?: string;
}

export type Gender = 'male' | 'female' | 'other';

export interface PatientEntery {
        id: string;
        name: string;
        dateOfBirth: string;
        ssn: string;
        gender: Gender;
        occupation: string;
}

export type NoSsnPatientEntery = Omit<PatientEntery, 'ssn'>;
