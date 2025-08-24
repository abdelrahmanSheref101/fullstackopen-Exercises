import { useEffect, useState } from 'react'
import comp2Objs from "./compareObjects.js"
import './App.css';
import axios from 'axios';


function App() {
        const [persons, setPersons] = useState([]);
        const [newPerson,setNewPerson]=useState({name:"",number:''});
        const [query,setQuery]=useState('');


        useEffect(()=>{
                axios.get("http://localhost:3001/persons").then(response=>{
                        setPersons(response.data);
                });
        },[]);

        const handleChange=(event)=>{
                const {name,value}=event.target;
                setNewPerson({...newPerson,[name]:value});
        }

        const addPerson=(event)=>{
                event.preventDefault();
                const personObj={...newPerson,id:persons.length+1};
                if(checkPersonExist(personObj,persons))
                {
                        alert(`${personObj.name} is already added to phonebook`);
                        return;
                }
                setPersons(persons.concat(personObj));
        }

        function checkPersonExist(newPerson , persons){
                for (const person of persons) {
                       if(comp2Objs(person,newPerson,["id"])) 
                                return true;
                }
                return false;
        }

        const shownPersons=persons.filter(person=>person.name.toLowerCase().includes(query.toLowerCase()));


        return(
                <div>
                        <h2>Phonebook</h2>
                        
                        <SearchFilter query={query} setQuery={setQuery}/>

                        <h3>Add a new Note</h3>
                        <Form newPerson={newPerson} handleChange={handleChange} addPerson={addPerson}/>

                        <h2>Numbers</h2>

                        <DisplayPersons persons={shownPersons}/>
                </div>
        );
}

export default App

const SearchFilter=({query,setQuery})=>{
                        return(
                        <div>
                                Search: <input value={query} onChange={(event)=>setQuery(event.target.value)} />
                        </div>
                        );
}

const Form=({newPerson,handleChange,addPerson})=>
{
        return(
                        <form onSubmit={addPerson}>

                                <label >
                                        Name: <input value={newPerson.name} onChange={handleChange} type="text" name="name"/>
                                </label>
                                <br/>
                                <label >
                                        Number:  <input value={newPerson.number} onChange={handleChange} type="text" name="number"/>
                                </label>
                                <br/>
                                <button type='submit' >add</button>

                        </form>

        )
}

const DisplayPersons=({persons})=>{
        return(
                <div>
                        {persons.map(person=><Person key={person.id} person={person}/>)}
                </div>
        );
}


const Person=({person})=>{
        return(
                <table className='table'>
                        <tbody>
                                <tr><th>Name:</th><td>{person.name}</td></tr>
                                <tr><th>Number:</th><td>{person.number}</td></tr>
                        </tbody>
                </table>
        )
}



