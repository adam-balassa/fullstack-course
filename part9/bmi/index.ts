import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { Request } from 'express';

const app = express();
app.use(express.json());

interface ExerciseRequest {
    daily_exercises: number[],
    target: number
}

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height: heightStr, weight: weightStr } = req.query;
    const [height, weight] = [Number(heightStr), Number(weightStr)];
    if (!height || !weight) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    const bmi = calculateBMI(Number(height), Number(weight));
    res.send({ height, weight, bmi });
});

app.post('/exercises', (req: Request<unknown, unknown, ExerciseRequest>, res) => {
    const { daily_exercises: exercises, target } = req.body;

    if (!exercises || !target 
        || typeof target != 'number' 
        || typeof exercises != 'object' 
        || exercises.some(e => typeof e != 'number')) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    res.send(calculateExercises(exercises, target));
});

const PORT = 3003;
app.listen(PORT);