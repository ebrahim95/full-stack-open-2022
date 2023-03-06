import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  if (height && weight) {
    res.json({
      height,
      weight,
      bmi
    });
  } else {
    res.status(400);
    res.json({
      error: 'malformatted parameters'
    });
  }

});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises && !target) {
    return res.json({
      error: "missing parameters"
    });
  } else if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.json({
      error: "malformatted parameters"
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(calculateExercises(daily_exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is connected ${PORT}`);
});
