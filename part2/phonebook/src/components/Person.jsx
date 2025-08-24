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

export default Person;
