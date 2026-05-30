import axios from "axios"

const personsUrl = 'http://localhost:3001/persons'

const getPersons = () => {

    return axios.get(personsUrl)
        .then(response => response.data)
        .catch(error => console.log(`Error fetching data: ${error}`))

}

const addPerson = (person) => {

    return axios.post(personsUrl, person)
        .then(response => response.data)
        .catch(error => console.log(`Error when adding a new person: ${error}`))

}

const deletePerson = (id) => {

    return axios.delete(`${personsUrl}/${id}`)
        .then(response => response.data)
        .catch(error => console.log(`Error when deleting a person: ${error}`))

}

const updatePersonNumber = (id, person) => {

    return axios
    .put(`${personsUrl}/${id}`, person)
    .then((response) => response.data)
    .catch((error) => {
      console.log(`Error when updating the phone number: ${error}`)
      throw error
    })

}

export { getPersons, addPerson, deletePerson, updatePersonNumber }