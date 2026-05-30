import { deletePerson } from '../services/phonebook.js'

const ShowPersons = ({ persons, onDelete }) => {

  return(
    <div>
      {persons.map((person) => <li key={person.name}>{person.name} {person.number} 
        <button type="button" onClick={() => onDelete(person.id)}>delete</button> 
        </li>)}
    </div>
  )
};

export default ShowPersons;