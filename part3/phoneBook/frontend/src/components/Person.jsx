const Person=({person,deletePerson})=>{
        return(
                <table className='table'>
                        <tbody>
                                <tr><th>Name:</th><td>{person.name}</td></tr>
                                <tr><th>Number:</th><td>{person.number}</td></tr>
                                <tr>
                                <td>
<button onClick={deletePerson}>delete</button>
                                        </td>
                                </tr>
                        </tbody>
                </table>
        )
}

export default Person;
