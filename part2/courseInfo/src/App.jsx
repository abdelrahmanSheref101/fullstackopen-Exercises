//
const App = () => {
          const course = {
            id: 1,
            name: 'Half Stack application development',
            parts: [
              {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
              },
              {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
              },
              {
                name: 'State of a component',
                exercises: 14,
                id: 3
              }
            ]
          }
        return(

                <Course course={course}/>
        )
}

export default App 

const Course=({course})=>{
        return (
                <div>
                        <Header name={course.name} />
                        <Content parts={course.parts}  />
                        <Total parts={course.parts}/>
                </div>
        )
}


//header
const Header=({name})=>{
        return(
              <h1>{name}</h1>
        );
};

//content
//Part name={props.parts[0].name} exercise={props.parts[0].exercises}  />

const Content=({parts})=>{
        return(
                <div>
                        {parts.map(part=><Part key={part.id} part={part}/>)}
                </div>
        );
};

//part component
const Part=({part})=>{
        return(
                <p>{part.name} {part.exercises}</p>
        );
};

//total
const Total=({parts})=>{
        return(
              <p style={{fontWeight:'bold'}}>Total number of exercises {parts.reduce((previous, current) => previous +current.exercises , 0)}</p>
        );
}
