import React, {useState} from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'


const Authors = ({show, setError}) => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const submit = async (event) => {
    event.preventDefault()
    try {
      await editAuthor({
        variables: {name, setBornTo: parseInt(born)}
      })
      setName("")
      setBorn("")
    } catch (error) {
      setError("Author cannot be edited")
    }
  }

if (result.loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const authors = result.data.allAuthors

  const authorNames = authors.map(a => a.name)
  //console.log(authorNames)
  //console.log(name)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={(target) => setName(target.label)} options={authorNames.map((e, key) => ({label: e, value: key}))}/>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">Update Author</button>
      </form>

    </div>
  )
}

export default Authors
