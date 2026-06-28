import { useState, useEffect } from 'react'
import initialPhonebook from '../data/phone'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import ShowPersons from './components/ShowPersons.jsx'
import{ Error, Notification } from './components/Notification.jsx'
import { getPersons, addPerson, deletePerson, updatePersonNumber } from './services/phonebook.js'
import axios from 'axios'


const App = () => {
  // const [persons, setPersons] = useState(initialPhonebook)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // Added state for name input
  const [newNumber, setNewNumber] = useState('') // Added state for phone number input
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    getPersons().then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = (event) =>{
    event.preventDefault()

    // The person already exists in the phonebook, ask if the user wants to update the number
    if(persons.some((person) => person.name === newName)){
      const personToUpdate = persons.find((person) => person.name === newName)

      //debug:
      console.log(persons)

      if( window.confirm(`${personToUpdate.name} already exists in the phonebook. Do you want to update the number?`)) {
        updatePersonNumber(personToUpdate.id, {...personToUpdate, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewName('');
            setNewNumber('');
          });
      }

      //debug:
      console.log(persons)

    // The person does not exist in the phonebook, add them
    } else{
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')

      addPerson({name: newName, number: newNumber}).then(
        addedPerson => {
          setNotificationMessage(`Added ${addedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }
      )

    }
  }

  const handleDeletePerson = (id) => {

    // Get the name of the person
    const personName = persons.find(person => person.id === id).name

    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      deletePerson(id)
        .then(() => {
          const personsUpdated = persons.filter(person => person.id !== id);
          setPersons(personsUpdated);
      })

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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

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
      <ShowPersons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App