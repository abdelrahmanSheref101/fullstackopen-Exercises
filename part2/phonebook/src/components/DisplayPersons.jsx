
import Person from "./Person.jsx"
const DisplayPersons=({persons,deletePerson})=>{
        return(
                <div>
                        {persons.map(person=><Person key={person.id} person={person} deletePerson={()=>deletePerson(person.id)}/>)}
                </div>
        );
}

export default DisplayPersons;

