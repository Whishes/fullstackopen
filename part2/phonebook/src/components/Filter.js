import React from 'react'

const Filter = ({ value, onChange }) => {
    return (
        <div>
        <h2>Filter Phonebook</h2>
        <div>
            Name to filter: <input value={value} onChange={onChange} />
            </div>
        </div>    
    )
}

export default Filter
