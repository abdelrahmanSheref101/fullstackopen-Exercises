import express, { Response } from 'express';
import { DiagnoseEntery } from '../types';
import diagnosesService from '../services/diagnoses'

const router = express.Router();

router.get('/', (_req, res: Response<DiagnoseEntery[]>) => {
        res.send(diagnosesService.getAllDiganoses());
});

export default router;
