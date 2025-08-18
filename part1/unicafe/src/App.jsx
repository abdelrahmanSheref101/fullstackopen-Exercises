//
import { useState } from 'react'

const Button=(props)=>{
        return(
        <button onClick={props.onClick}>{props.text}</button>
        )
}

const Display=(props)=>{
        return(
        <div>
                        {props.text} {props.state}
        </div>
        )
}

function App() {
        const [goodState,setGoodState]=useState(0);
        const [neutralState,setNeutralState]=useState(0);
        const [badState,setBadState]=useState(0);
        
        const incrementState =(state,setter)=>{
                return ()=>{setter(state+1)};
        }

        return(
                <div>
                        <h1>Give us your feedback :) !</h1> 
                        <Button onClick={incrementState(goodState,setGoodState)} text="good"/>
                        <Button onClick={incrementState(neutralState,setNeutralState)} text="neutral"/>
                        <Button onClick={incrementState(badState,setBadState)} text="bad"/>

                        <h2>Statistics</h2>
                        <Display text="good" state={goodState}/>
                        <Display text="neutral" state={neutralState}/>
                        <Display text="bad" state={badState}/>
                </div>
        )
}

export default App
