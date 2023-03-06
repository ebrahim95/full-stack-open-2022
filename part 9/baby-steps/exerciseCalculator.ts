interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number,
  ratingDescription: string,
  target: number,
  average: number

}

const days: number[] = process.argv.slice(2, -1).map(hours => Number(hours));
const target = Number(process.argv[-1]);


export const calculateExercises = (days: number[], target: number): Result => {
  const average: number = days.reduce((sum: number, currentValue: number) => sum + currentValue, 0) / days.length;
  const trainingDays: number = days.filter((hours: number) => hours !== 0).length;
  const success: boolean = days.length === trainingDays;
  const ratingDescription = ['Work Harder!', 'Good Work! Almost there', 'Great! Keep it going'];

  function calRating(average: number, target: number): number {
    if ((average - target) >= 2) {
      return 1;
    } else if ((average - target) <= 1) {
      return 2;
    } else {
      return 3;
    }
  }

  const rating = calRating(average, target);

  return {
    periodLength: days.length,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating - 1],
    target,
    average
  };

};

