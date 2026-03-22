import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const addName = (event) =>{
  event.preventDefault()

  if(persons.some((person) => person.name === newName)){
    window.alert(`${newName} is already added to phonebook. Please use a different name.`)
  } else{
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }
}

const ShowPersonNames = (props) => {
  //debug
  console.log(persons)
  return(
    <div>
      {persons.map((person) => <li>{person.name}</li>)}
    </div>
  )
};

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPersonNames props={persons} />
    </div>
  )
}

export default App