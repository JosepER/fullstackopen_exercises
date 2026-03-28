import { useState } from 'react'
import initialPhonebook from '../data/phone'

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
  }ß
}

const ShowPersons = ({ persons }) => {
  //debug
  console.log(persons)
  return(
    <div>
      {persons.map((person) => <li key={person.name}>{person.name} {person.phone}</li>)}
    </div>
  )
};

const personsToShow =  
  filter.trim() === '' 
    ? persons 
    : persons.filter((person) => 
      person.name.toLocaleLowerCase().includes(filter.toLowerCase())
     );

  return (
    <div>
      <h2>Phonebook</h2>

      filter shown with <input type='text' onChange={(event) => setFilter(event.target.value)}/>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number: <input 
            type="tel"
            value={newPhoneNumber}
            onChange={(event) => setNewPhoneNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPersons persons={personsToShow} />
    </div>
  )
}

export default App