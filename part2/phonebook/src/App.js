import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ searchPersons, setSearchPersons ] = useState('')
  const [ personFilter, setPersonFilter ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
        //console.log('effect')
        personsService
          .getAll()
            .then(initialPersons => {
                //console.log('promise fulfilled')
                setPersons(initialPersons)
        })
    }, [])
    //console.log('render', persons.length, 'persons')

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
      number: newNumber
    }
    
    const existingPerson = persons.find(person => person.name === newName)
    //console.log(existingPerson)

      if (existingPerson) {
        if (window.confirm(`${newName} is in the phonebook already, would you like to replace the phone number?`)) {
          personsService
            .updatePerson(existingPerson.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === returnedPerson.id
                ? returnedPerson
                : person))
            })
            .catch(error => {
              alert(`Person was already deleted from the server`)
            })
        }

      } else {
        // Post data to JSON server
        personsService
          .createPerson(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName("")
            setNewNumber("")
          })
      }
  }
  
  const deletePersons = (id, name) => {
    if (window.confirm(`Confirm delete ${name}`)) {
      personsService
      .deletePersont(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch(error => {
        alert(`${name} has already been deleted`)
        })
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
      {searchPersons === '' ? <Person personFilter={persons} deletePersons={deletePersons}/> : <Person personFilter={personFilter} deletePersons={deletePersons} />}
    </div>
  )
}

export default App