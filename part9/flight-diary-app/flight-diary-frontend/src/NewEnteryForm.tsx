import { useState } from "react"
import type { DiaryEntery, NewDiaryEntery } from "./types"
import diariesService from "./diariesService"

function NewEnteryForm({ currNum, addEnteryToState }: { currNum: number, addEnteryToState: (enter: DiaryEntery) => void }) {
        const [newEntery, setNewEntery] = useState<NewDiaryEntery>({
                id: -1,
                date: '',
                weather: '',
                visibility: '',
                comment: ''
        })

        const [errorMsg, setErrorMsg] = useState('');

        const [selectedWeather, setSelectedWeather] = useState('');
        const [selectedVisibility, setSelectedVisibility] = useState('');

        const renderRandioInput = (values: string[], isWeather: boolean) => {
                const selected = (isWeather) ? selectedWeather : selectedVisibility;
                const setSelected = (isWeather) ? setSelectedWeather : setSelectedVisibility;
                return (
                        <>
                                {isWeather ? 'Weather: ' : 'Visibility: '}
                                {
                                        values.map(v => {
                                                return (
                                                        <label >
                                                                <input type="radio" value={v} checked={selected === v} onChange={
                                                                        (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.value)
                                                                } />{v} |
                                                        </label>
                                                )
                                        })
                                }
                        </>
                )
        }

        const renderInput = (name: string, type: string, attr: keyof NewDiaryEntery,) => {
                return (
                        <div>
                                <label >{name}: </label>
                                <input type={type} name={name} value={newEntery[attr]} onChange={(event) => {
                                        setNewEntery({ ...newEntery, [attr]: event.target.value })
                                }} />
                        </div>
                )
        }

        //ik i should have made it in checkboxes/select/radio , but i just trust the user lol

        const handleSubmit = (event: React.SyntheticEvent) => {
                event.preventDefault();
                newEntery.id = currNum + 1;
                diariesService.addNewDiary(newEntery).then(
                        addedEntery => {
                                console.log("yaaya we added the mf entery : ", addedEntery);
                                addEnteryToState(addedEntery as DiaryEntery);
                        }
                ).catch(error => {
                        if (error.name === 'axiosError')
                                setErrorMsg(error.message);
                }
                );

        }

        return (
                <div>
                        <h1>Add new entery</h1>
                        {
                                (errorMsg !== '') ?
                                        <div style={{ color: "red" }}>
                                                Error:{errorMsg}
                                        </div>
                                        : null
                        }
                        <form onSubmit={handleSubmit}>
                                {renderInput('Date', 'date', 'date')}
                                {renderInput(`Comment`, 'text', 'comment')}
                                {renderRandioInput(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'], true)}
                                <br />
                                {renderRandioInput(['greate', 'good', 'ok', 'poor'], false)}
                                <br />
                                <button type="submit">submit diary</button>
                        </form>
                </div>
        )
}

export default NewEnteryForm

