import express, { Request, NextFunction, Response } from 'express';
import morgan from 'morgan'
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExercisesReport } from './exerciseCalculator';

const app = express();

app.use(express.json());
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get("/hello", (_req, res) => {
        res.send("<h1>Hello World !</h1>")
})

interface BmiQueryParams {
        weight: number,
        height: number
}

const bmiHandler = (req: Request<{}, {}, {}, BmiQueryParams>, res: Response) => {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);



        if (!weight || !height)
                return res.status(400).json({ error: "ERROR : parameters must be number !" });

        if (weight <= 0 || height <= 0)
                return res.status(400).json({ error: "ERROR : invalid weight or height (under 0)." });

        const bmi = calculateBmi(height, weight);
        return res.status(200).json({
                weight,
                height,
                bmi
        });
}

const validateExerciesValues = (req: Request, res: Response, next: NextFunction) => {

        let { daily_exercises: dailyExercises, target } = req.body;
        console.log("dailyExercises :: ", dailyExercises);
        console.log("target :: ", target);
        // 1. check existance
        if (!dailyExercises || target === undefined)
                return res.status(400).json({ error: "ERROR : malformed input (parameter missing)" })

        // 2. check if inputs are in valid structure 
        // (is dailyExercises an array ? is target a number?)
        if (!Array.isArray(dailyExercises) || isNaN(Number(target)))
                return res.status(400).json({ error: "ERROR : malformed input (not valid structure)" })

        // 3. is really an array of numbers
        if (dailyExercises.some((val: unknown) => typeof val !== 'number' || isNaN(Number(val))))
                return res.status(400).json({ error: "ERROR : malformed input (all daily_excercies must be number)" })


        req.body = {
                dailyExercises,
                target: Number(target),
        }
        next();
        return;
}

const exercisesHandler = (req: Request, res: Response) => {
        const { dailyExercises, target } = req.body;
        console.log("hey shit head");
        const report: ExercisesReport = calculateExercises(dailyExercises, target);
        res.status(200).json(report);
        return;
}


app.get("/bmi", bmiHandler);
app.get("/exercises", validateExerciesValues, exercisesHandler);


const PORT = 3003;
app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
})



