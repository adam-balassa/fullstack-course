type Bmi = 'Underweight (Severe thinness)' | 'Underweight (Moderate thinness)' | 'Underweight (Mild thinness)' | 'Normal range' | 'Overweight (Pre-obese)' | 'Obese (Class I)' | 'Obese (Class II)' | 'Obese (Class III)';

export function calculateBMI(height: number, mass: number): Bmi {
    const bmi = mass / height**2 * 10_000;
    if (bmi < 16) return 'Underweight (Severe thinness)';
    if (bmi < 17) return 'Underweight (Moderate thinness)';
    if (bmi < 18.5) return 'Underweight (Mild thinness)';
    if (bmi < 25) return 'Normal range';
    if (bmi < 30) return 'Overweight (Pre-obese)';
    if (bmi < 35) return 'Obese (Class I)';
    if (bmi < 40) return 'Obese (Class II)';
    return 'Obese (Class III)';
}

const height = Number(process.argv[2]);
const mass = Number(process.argv[3]);
if (!mass || !height)
    console.error('Inputs should be numbers');
else 
    console.log(calculateBMI(height, mass));