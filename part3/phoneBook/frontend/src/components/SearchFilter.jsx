//
const SearchFilter=({query,setQuery})=>{
                        return(
                        <div>
                                Search: <input value={query} onChange={(event)=>setQuery(event.target.value)} />
                        </div>
                        );
}

export default SearchFilter;
