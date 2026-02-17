import { useEffect, useState } from "react"
import type { DiaryEntery } from "./types"
import diaryService from "./diariesService";
import Enteries from "./Enteries";
import NewEnteryForm from "./NewEnteryForm";

function App() {
        const [diaryEnteries, setDiaryEnteries] = useState<DiaryEntery[]>([]);

        useEffect(() => {
                diaryService.getAllDiaries().then(enteries => {
                        console.log("we got enteries", enteries);
                        setDiaryEnteries(enteries)
                }
                );
        }, [])

        function addEnteryToState(entery: DiaryEntery) {
                setDiaryEnteries(diaryEnteries.concat(entery));
        }

        return (
                <div>
                        <NewEnteryForm currNum={diaryEnteries.length} addEnteryToState={addEnteryToState} />
                        <Enteries enteries={diaryEnteries} />
                </div>
        );

}

export default App
