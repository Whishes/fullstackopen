import React from 'react'

const Person = ({ personFilter }) => {
    return personFilter.map((person) => (
        <p key={person.id}>
            {person.name} - {person.number}
        </p>
    ))
}

export default Person
