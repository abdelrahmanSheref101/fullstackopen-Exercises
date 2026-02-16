import express, { NextFunction, Request, Response } from 'express';
import { NewPatientEntery, NoSsnPatientEntery, PatientEntery } from '../types';
import patientsService from '../services/patients';
import { NewPatientSchema } from '../utils';
// import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NoSsnPatientEntery[]>) => {
        res.send(patientsService.getNoSsnPatients());
})

export const NewPatientParserMiddelware = (req: Request, _res: Response, next: NextFunction) => {
        try {
                NewPatientSchema.parse(req.body);
                next();
        } catch (error: unknown) {
                next(error);
        }
}


router.post('/', NewPatientParserMiddelware, (req: Request<unknown, unknown, NewPatientEntery>, res: Response<PatientEntery>) => {
        const addedEntery = patientsService.addEntery(req.body);
        res.status(201).send(addedEntery);
})


export default router;
