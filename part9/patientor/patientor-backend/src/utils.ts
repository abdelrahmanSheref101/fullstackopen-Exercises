import { Gender } from "./types";
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

export const NewPatientSchema = z.object({
        name: z.string(),
        dateOfBirth: z.string().date(),
        ssn: z.string(),
        gender: z.nativeEnum(Gender),
        occupation: z.string(),
});



export const toNewPatient = (object: unknown) => {
        return NewPatientSchema.parse(object);
}

export const getNewId = () => {
        return uuid();
}
