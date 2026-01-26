// interface ExercisesValues {
//         dailyHours: number[],
//         targetAvg: number
// }

// function parseExerArguments(args: string[]): ExercisesValues {
//         if (args.length < 4) throw new Error("Not enough arguments");
//
//         const values = args.slice(2).map(Number);
//         if (values.some(isNaN))
//                 throw new Error("values must be numbers !!")
//
//
//         return {
//                 dailyHours: values.slice(1, values.length),
//                 targetAvg: values[0]
//         };
//
//
// }
//

export interface ExercisesReport {
        periodLength: number,
        trainingDays: number,
        target: number,
        average: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
}

export function calculateExercises(dailyHours: number[], targetAvg: number): ExercisesReport {

        const trainingDaysValues = dailyHours.filter(day => day !== 0);
        const trainingDays = trainingDaysValues.length;

        const totalHours = trainingDaysValues.reduce((a, b) => a + b, 0);

        const periodLength = dailyHours.length;
        const average = totalHours / periodLength;

        let success = false;
        let rating = 1;
        let ratingDescription = "Bad , u need more adjustments";

        if (targetAvg === 0) {
                success = true;
                rating = 3;
                ratingDescription = "good u've reached the targeted average (u would always do , it's 0 xD)"
        }
        else {
                const ratingScore = average / targetAvg * 100.0;
                switch (true) {
                        case (70 <= ratingScore && ratingScore < 95):
                                rating = 2;
                                ratingDescription = "not too bad but could be better"
                                break;
                        case (95 <= ratingScore):
                                success = true;
                                rating = 3
                                ratingDescription = "good u've reached the targeted average"
                                break;
                }
        }


        return {
                periodLength,
                trainingDays,
                target: targetAvg,
                average,
                success,
                rating,
                ratingDescription,
        };
}


//
// try {
//         const { dailyHours, targetAvg }: ExercisesValues = parseExerArguments(process.argv);
//         const report: ExercisesReport = calculateExercises(dailyHours, targetAvg);
//         console.log(report);
// } catch (error) {
//         let errMsg = "smth bad happend ::";
//         if (error instanceof Error)
//                 errMsg += " ERROR : " + error.message;
//         console.log(errMsg);
// }
