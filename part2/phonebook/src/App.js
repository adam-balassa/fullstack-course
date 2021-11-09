import React, { useState, useEffect } from 'react'
import personsService from './service/persons'

const Notification = ({notification: {message, error=false}}) => {
  if (!message)
    return <></>
  return <div style={{
    backgroundColor: error ? 'red' : 'green',
    color: 'white',
    padding: '1rem',
    boxShadow: '#2227 2px 2px 5px',
    margin: '1rem',
    borderRadius: '5px',
    textAlign: 'center'
  }}>
    <span>{message}</span>
  </div>
}

const Filter = ({value, onChange}) => 
  <div>filter shown with: <input value={value} onChange={onChange}/></div>

const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <div>name: <input value={name} onChange={onNameChange} /></div>
    <div>number: <input value={number} onChange={onNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>


const Person = ({ person, onDelete }) =>{
  const onClickEvent = () => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`))
      onDelete()
  }

  return <div>
    {person.name} {person.number}
    <button onClick={onClickEvent}>Delete</button>
  </div>
}

const Persons = ({ persons, onDelete }) =>
  <>{persons.map(person => <Person 
      key={person.name} 
      person={person}
      onDelete={() => onDelete(person)}
    />)}</>

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState({})

  useEffect(() => {
    personsService.getAll().then(persons => setPersons(persons))
  }, [])

  const showNotification = (message, error) => {
    setNotification({message, error})
    setTimeout(() => {
      setNotification({})
    }, error ? 2500 : 1500)
  }

  const addName = event => {
    event.preventDefault()
    const newPerson = persons.find(person => person.name === newName )
    if (newPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace number with new one?`)) {
        personsService.update({...newPerson,  number: newNumber})
        .then(result => setPersons(persons.map(person => person.id !== newPerson.id ? person : result)))
        .then(() => showNotification(`${newName}'s phone number is successfully updated`))
        .catch(() => showNotification(`${newName}'s data has been removed from the server`, true))
      }
      return
    }
    personsService.create({name: newName, number: newNumber})
    .then(newPerson => setPersons([...persons, newPerson]))
    .then(() => showNotification(`${newName} successfully added`))
  }

  const onDeletePerson = person => {
    personsService.deletePerson(person)
    .then(() => setPersons(persons.flatMap(p => p.id !== person.id ? [p] : [])))
    .then(() => showNotification(`${person.name} successfully deleted`))
  }



  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter value={filter} onChange={event => setFilter(event.target.value)}/>
      <h2>Add a new</h2>
      <PersonForm name={newName} 
                  number={newNumber} 
                  onNameChange={event => setNewName(event.target.value)} 
                  onNumberChange={event => setNewNumber(event.target.value)}
                  onSubmit={addName}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={onDeletePerson}/>
    </div>
  )
}

export default App