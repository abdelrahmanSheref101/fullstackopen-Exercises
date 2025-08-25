const Notification=({sucess, message})=>{
        if (!message)
                return null;


        const styling={
                  color: "red",
                  background:"lightgrey",
                  fontSize: "20px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
        }

        if(sucess)
                styling.color="green";


        return(
                <div style={styling} >
                       {message} 
                </div>
        )
        
}

export default Notification; 
