const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / ((height / 100) ** 2));
  let result = "";
  if (bmi <= 18.4) {
    return result = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 25) {
    return result = "Normal (healthy weight)";
  } else if (bmi > 25) {
    return result = "Overweight";
  }
  return result;
};

export { calculateBmi };

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface MultiplyValues {
  height: number;
  weight: number;
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error) {
  console.log('Error, something bad happened, message: ', error.message);
}