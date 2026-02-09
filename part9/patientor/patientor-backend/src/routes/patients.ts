import express, { Response } from 'express';
import { NoSsnPatientEntery } from '../types';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res: Response<NoSsnPatientEntery[]>) => {
        res.send(patientsService.getNoSsnPatients());
})

export default router;
