import express, { NextFunction, Request, Response } from 'express';
import patientsRouter from './routes/patients'
import diagnosesRouter from './routes/diagnoses'
import { z } from 'zod';

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
        res.send('pong');
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
        if (error instanceof z.ZodError) {
                res.status(400).send({ error: error.issues });
        } else {
                next(error);
        }
};

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use(errorMiddleware);

app.listen(3001, () => {
        console.log('server is running on port : ', 3001);
        console.log('check: http://localhost:3001/api/ping');
})


