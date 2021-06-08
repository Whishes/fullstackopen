
type rating = 1 | 2 | 3;

interface TrainingResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: rating;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(targetAmount: number, trainingAmount: number[]): TrainingResult {
    const total = trainingAmount.reduce(
        (all, hours) => all + hours, 0
    );
    const average = total / trainingAmount.length;

    let rating: rating = 1;
    if (average >= targetAmount - 1) {
        rating = 2;
    }
    if (average >= targetAmount) {
        rating = 3;
    }
    const ratingDescription: { [key: number]: string } = {
        1: "bad",
        2: "not too bad but could be better",
        3: "target reached",
    };

    return {
        periodLength: trainingAmount.length,
        trainingDays: trainingAmount.filter(hours => hours > 0).length,
        success: rating === 3,
        rating,
        ratingDescription: ratingDescription[rating],
        target: targetAmount,
        average
    };
}

export { calculateExercises };

interface ExerciseValues {
  targetAmount: number;
  trainingAmount: number[];
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const trainingAmount: number[] = [];
    const trainingArgArray: string[] = args.slice(3);
    trainingArgArray.forEach(number => {
        if (isNaN(Number(number))) {
            throw new Error('Provided values were not numbers!');
        }
        trainingAmount.push(Number(number));
    });

    return {
        targetAmount: Number(args[2]),
        trainingAmount,
    };
};

try {
    const { targetAmount, trainingAmount } = parseArguments(process.argv);
    console.log(calculateExercises(targetAmount, trainingAmount));
} catch (error) {
    if (error instanceof Error) {
        console.log('Error, something bad happened, message: ', error.message);
    }
}