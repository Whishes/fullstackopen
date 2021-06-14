import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    
    const numHeight = Number(height);
    const numWeight = Number(weight);

    if (isNaN(numHeight) || isNaN(numWeight)) {
        res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi: {
        height: number;
        weight: number;
        bmi: string;
    } = {
        height: numHeight,
        weight: numWeight,
        bmi: calculateBmi(numHeight, numWeight)
    };

    res.json(bmi);
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body as {
        daily_exercises: string,
        target: number
    };

    if (!daily_exercises || !target) {
        res.status(400).json({ error: "parameters missing" });
        return;
    }

    if (isNaN(Number(target))) {
    res
      .status(400)
            .json({ error: 'target is meant to be a number' });
        return;
  }

    const trainingAmount: number[] = [];
    const dailyExercises: number[] = JSON.parse(daily_exercises);
        dailyExercises.forEach(d => {
            if (isNaN(Number(d))) {
                throw new Error();
            }
            trainingAmount.push(Number(d))
        });

    const trainingResult: {
        periodLength: number;
        trainingDays: number;
        success: boolean;
        rating: 1 | 2 | 3;
        ratingDescription: string;
        target: number;
        average: number;
    } = calculateExercises(target, trainingAmount);

    res.json(trainingResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});