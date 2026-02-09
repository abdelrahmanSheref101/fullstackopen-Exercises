import express from 'express';
import patientsRouter from './routes/patients'
import diagnosesRouter from './routes/diagnoses'

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
        console.log('we go ur order maam');
        res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(3001, () => {
        console.log('server is running on port : ', 3001);
        console.log('check: http://localhost:3001/api/ping');
})


