import { useEffect, useState } from 'react'
import comp2Objs from "./compareObjects.js"
import './App.css';
import Form from "./components/Form.jsx"
import DisplayPersons from "./components/DisplayPersons.jsx"
import SearchFilter from "./components/SearchFilter.jsx"
import personsService from "./services/persons.js"

function App() {
        const [persons, setPersons] = useState([]);
        const [newPerson,setNewPerson]=useState({name:"",number:''});
        const [query,setQuery]=useState('');


        useEffect(()=>{
                personsService.getAll().then(initPersons=>setPersons(initPersons));                

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
                personsService.create(personObj).then(
                        createdPerson=>setPersons(persons.concat(createdPerson))
                );
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






