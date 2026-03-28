const ShowPersons = ({ persons }) => {
  //debug
  console.log(persons)
  return(
    <div>
      {persons.map((person) => <li key={person.name}>{person.name} {person.phone}</li>)}
    </div>
  )
};

export default ShowPersons;