
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { USER, ALL_BOOKS, BOOK_ADDED } from "./queries"
import { useQuery} from "@apollo/client"
import Notify from './components/Notify'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [user, setUser] = useState(null)
  const userQ = useQuery(USER)
  const [books, setBooks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)
    
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.watchQuery({
        query: ALL_BOOKS,
        data: {allBooks : dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    if (userQ.data) {
      setUser(userQ.data.user)
    }
  }, [userQ])

  const result = useQuery(ALL_BOOKS)
  useEffect(() => {
    if (result.data)
      setBooks(result.data.allBooks)
  }, [result])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <Notify errorMessage={errorMessage}/>

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setError={notify}
      />
      <Authors
        show={page === 'authors'} setError={notify}
      />

      <Books
        show={page === 'books'} books={books} setError={notify}
      />

      <NewBook
        show={page === 'add'} setError={notify} updateCacheWith={updateCacheWith}
      />
      
      {user && <Recommend
        show={page === 'recommend'} user={user}
      />}

    </div>
  )
}

export default App