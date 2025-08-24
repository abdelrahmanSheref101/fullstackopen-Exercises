
import Person from "./Person.jsx"
const DisplayPersons=({persons})=>{
        return(
                <div>
                        {persons.map(person=><Person key={person.id} person={person}/>)}
                </div>
        );
}

export default DisplayPersons;

