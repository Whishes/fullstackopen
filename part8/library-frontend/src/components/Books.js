import React, { useEffect, useState } from 'react'

const Books = (props) => {
  const books = props.books
  const setError = props.setError
  //const result = useQuery(ALL_BOOKS)
  const [book, setBook] = useState([])
  const [filteredBook, setFilteredBook] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")

  useEffect(() => {
    if (books) {
      const allBooks = books
      setBook(allBooks)
      let genres = ["all genres"]
      allBooks.forEach(item => {
        item.genres.forEach(genre => {
          if (genres.indexOf(genre) === -1) {
            genres.push(genre)
          }
        })
      })
      setGenres(genres)
      setSelectedGenre("all genres")
    } else {
      setError("books not found")
    }
  }, [books, setError])

  useEffect(() => {
    if (selectedGenre === "all genres") {
      setFilteredBook(book)
    } else {
      const bookFilter = book.filter(b => b.genres.includes(selectedGenre))
      setFilteredBook(bookFilter)
    }
  }, [selectedGenre, book])

  if (books.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre "{selectedGenre}"</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBook.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books