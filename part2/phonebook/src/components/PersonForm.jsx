const PersonForm = ({ addName, newName, setNewName, newPhoneNumber, setNewPhoneNumber }) => {

  return(<form onSubmit={addName}>
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
      </form>)
  
}

export default PersonForm;