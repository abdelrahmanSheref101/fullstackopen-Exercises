//
import { useState } from 'react'

const Button=(props)=>{
        return(
        <button onClick={props.onClick}>{props.text}</button>
        )
}


const StatisticsLine=(props)=>{
                return(
                        <tr>
                                <td>{props.text}</td><td>{props.value}{(props.percentage)?"%":" "}</td>
                        </tr>
                )
}

const Statistics=(props)=>{
        if(props.states["allStates"] == 0)
        {
                return(
                        <div>
                                No feedback givin        
                        </div>
                )
        }

        return(
                <table>
                        <tbody>
                        <StatisticsLine text="good" value={props.states["goodState"]}/>
                        <StatisticsLine text="neutral" value={props.states["neutralState"]}/>
                        <StatisticsLine text="bad" value={props.states["badState"]}/>

                        <StatisticsLine text="all" value={props.states["allStates"]}/>
                        <StatisticsLine text="average" value={props.methdos["getAvg"]()}/>
                        <StatisticsLine text="positive" value={props.methdos["getPositivePerc"]()} percentage={true}/>
                        </tbody>
                </table>

        )

}

function App() {
        const [goodState,setGoodState]=useState(0);
        const [neutralState,setNeutralState]=useState(0);
        const [badState,setBadState]=useState(0);
       
        const [allStates,setAll]=useState(0);

        const incrementState =(state,setter)=>{
                
                return ()=>{
                        setter(state+1);
                        setAll(allStates+1);
                };
        }

        const getAvg=()=>{
                return ((goodState-badState)/allStates).toFixed(2);
        }

        const getPositivePerc=()=>{
                return ((goodState/allStates)*100).toFixed(2);
        }

        return(
                <div>
                        <h1>Give us your feedback :) !</h1> 
                        <Button onClick={incrementState(goodState,setGoodState)} text="good"/>
                        <Button onClick={incrementState(neutralState,setNeutralState)} text="neutral"/>
                        <Button onClick={incrementState(badState,setBadState)} text="bad"/>

                        <h2>Statistics</h2>
                        <Statistics states={{goodState,neutralState,badState,allStates}} methdos={{getAvg,getPositivePerc}}/>
                        
                </div>
        )
}

export default App
