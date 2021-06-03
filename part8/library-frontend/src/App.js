
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'
import { USER, ALL_BOOKS } from "./queries"
import { useQuery} from "@apollo/client"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [user, setUser] = useState(null)
  const userQ = useQuery(USER)
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (userQ.data) {
      setUser(userQ.data.user)
    }
  }, [userQ])

  useEffect(() => {
    if (result.data)
      setBooks(result.data.allBooks)
  }, [result])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'} books={books}
      />

      <NewBook
        show={page === 'add'}
      />
      
      {user && <Recommend
        show={page === 'recommend'} user={user}
      />}

    </div>
  )
}

export default App