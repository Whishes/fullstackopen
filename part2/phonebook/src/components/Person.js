import React from 'react'

const Person = ({ personFilter, deletePersons }) => {
    return personFilter.map((person) => (
        <p key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => deletePersons(person.id, person.name)}>Delete</button>
        </p>
    ))
}

export default Person
