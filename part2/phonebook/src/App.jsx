import { useState, useEffect } from 'react'
import initialPhonebook from '../data/phone'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import ShowPersons from './components/ShowPersons.jsx'
import axios from 'axios'

const personsUrl = 'http://localhost:3001/persons'

const App = () => {
  // const [persons, setPersons] = useState(initialPhonebook)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // Added state for name input
  const [newNumber, setNewNumber] = useState('') // Added state for phone number input
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(personsUrl)
      .then(response => setPersons(response.data))
      .catch(error => console.log(`Error when initially fetching data: ${error}`))
  }, [])

  const addName = (event) =>{
    event.preventDefault() 

    if(persons.some((person) => person.name === newName)){
      window.alert(`${newName} is already added to phonebook. Please use a different name.`)
    } else{
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')

      axios.post(personsUrl, {name: newName, number: newNumber})
        .then(response => { response.data })
        .catch(error => console.log(`Error when adding a new person: ${error}`))

    }
  }

  const personsToShow =  
    filter.trim() === '' 
      ? persons 
      : persons.filter((person) => 
        person.name.toLocaleLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />

      <h3>add a new</h3>
      <PersonForm 
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      
      <h3>Numbers</h3>
      <ShowPersons persons={personsToShow} />
    </div>
  )
}

export default App