import React from 'react'

const PersonForm = (props) => {
    // console.log(props)
    const { formProps: { addContent, newName, setNewName, newNumber, setNewNumber }} = props

    return (
        <form onSubmit={addContent}>
            <div>
                Name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm
