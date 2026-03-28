import { useState } from 'react'
import initialPhonebook from '../data/phone'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import ShowPersons from './components/ShowPersons.jsx'

const App = () => {
  const [persons, setPersons] = useState(initialPhonebook) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) =>{
  event.preventDefault()

  if(persons.some((person) => person.name === newName)){
    window.alert(`${newName} is already added to phonebook. Please use a different name.`)
  } else{
    setPersons(persons.concat({name: newName, phone: newPhoneNumber}))
    setNewName('')
    setNewPhoneNumber('')
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
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
      />
      
      <h3>Numbers</h3>
      <ShowPersons persons={personsToShow} />
    </div>
  )
}

export default App