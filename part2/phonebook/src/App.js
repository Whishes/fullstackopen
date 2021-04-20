import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ searchPersons, setSearchPersons ] = useState('')
  const [ personFilter, setPersonFilter ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handlePersonFilter = (event) => {
    setSearchPersons(event.target.value)
    const searched = persons.filter((person) => person.name.toLowerCase().match(event.target.value.toLowerCase())
    )
    setPersonFilter(searched)
  }

  const addContent = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber
    }
    
    const existingPerson = persons.find((person) => person.name === newName )
      if (existingPerson) {
        window.alert(`${newName} has already been added to the phonebook`)
      } else {
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber("")
      }
  } 

  const formProps = {
    addContent, newName, setNewName, newNumber, setNewNumber
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchPersons} onChange={handlePersonFilter} />
      
      <h3>Add a new...</h3>
      <PersonForm formProps={formProps} />
      
      <h2>Numbers</h2>
        {searchPersons === '' ? <Person personFilter={persons} /> : <Person personFilter={personFilter} />}
    </div>
  )
}

export default App