const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

const calculateBmi = (height: number, weight: number): string => {
  const BMI: number = (weight / (height / 100) ** 2);
  console.log(BMI)
  if (BMI < 25) {
    return 'Normal (Healthy Weight)'
  } else if (BMI >= 30) {
    return 'Obese (Unhealthy Weight)'
  } else if (BMI >= 25 || BMI <= 29) {
    return 'Overweight (Unhealthy Weight)'
  }

}

console.log(calculateBmi(height, weight))

