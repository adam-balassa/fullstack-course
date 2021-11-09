
const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Part = (props) => {
  return (<p>{props.part.name} {props.part.exercises}</p>)
}

const Content = ({parts}) => {
  return (
    <div>
      { parts.map(part => <Part key={part.id} part={part}/>) }
    </div>
  )
}

const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const sum = (acc, curr) => acc + curr
  return (<p><b>total of {exercises.reduce(sum)} exercises</b></p>)
}

const Course = ({ course }) => 
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course