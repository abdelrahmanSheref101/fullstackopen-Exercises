interface BmiVlaues {
        height: number,
        weight: number,
}



const parseArguments = (args: string[]): BmiVlaues => {
        if (args.length < 4) throw new Error("not enough arguments");
        if (args.length > 4) throw new Error("too many arguments");

        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
                return {
                        height: Number(args[2]),
                        weight: Number(args[3])
                }
        else
                throw new Error("arguments must be number !");
}

const bmiCalculator = (height: number, weight: number): string => {

        const heightInMeters: number = height / 100.0;

        const bmi: number = weight / (heightInMeters ** 2);
        switch (true) {
                case (bmi < 16.0):
                        return "Underweight (Severe thinness)";
                case (16.0 <= bmi && bmi < 17.0):
                        return "Underweight (Moderate thinness)";
                case (17.0 <= bmi && bmi < 18.5):
                        return "Underweight (Mild thinness)";
                case (18.5 <= bmi && bmi < 25.0):
                        return "Normal range";
                case (25.0 <= bmi && bmi < 30.0):
                        return "Overweight (Pre-obese)";
                case (30.0 <= bmi && bmi < 35.0):
                        return "Obese (Class I)";
                case (35.0 <= bmi && bmi < 40.0):
                        return "Obese (Class II)";
                case (40.0 <= bmi):
                        return "Obese (Class III)";

        }
        return "";
}



try {
        const { height, weight } = parseArguments(process.argv);

        console.log("hey fatty , ur BMI :: ", bmiCalculator(height, weight));


} catch (error) {
        let errorMessage: string = "smth bad happend.";
        if (error instanceof Error)
                errorMessage += " ERROR: " + error.message;

        console.log(errorMessage);
}
