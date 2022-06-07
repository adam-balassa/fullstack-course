type Rating = 1 | 2 | 3;
type RatingDescription = 'there\'s room for improvement' | 'not too bad but could be better' | 'well done, keep on the good work!';


interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: RatingDescription;
    target: number;
    average: number;
}

export function calculateExercises(exercises: number[], target: number): ExerciseResult {
    const average = exercises.reduce((acc, e) => acc + e, 0) / exercises.length;
    const rating: Rating = ((): Rating => {
        const result = average / target;
        if (result > 1) return 3;
        if (result < 0.8) return 1;
        return 2;
    })(); 
    const ratingDescription: RatingDescription = ((): RatingDescription => {
        switch (rating) {
            case 1: return 'there\'s room for improvement';
            case 2: return 'not too bad but could be better';
            case 3: return 'well done, keep on the good work!';
        }
    })();
    
    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e != 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, __, target, ...exercises] = process.argv;
if (Number.isNaN(target) || exercises.some(e => Number.isNaN(e)))
    console.error('Inputs should be numbers');
else
    console.log(calculateExercises(exercises.map(e => Number(e)), Number(target)));
