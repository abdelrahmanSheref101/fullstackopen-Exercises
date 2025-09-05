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

export default Form
