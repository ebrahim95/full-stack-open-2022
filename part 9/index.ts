import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const bmi = calculateBmi(height, weight)
  if (height && weight) {
    res.json({
      height,
      weight,
      bmi
    })
  } else {
    res.status(400)
    res.json({
      error: 'malformatted parameters'
    })
  }

})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is connected ${PORT}`)
})
