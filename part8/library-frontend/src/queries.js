import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`
export const ALL_BOOKS = gql`
    query allBooks (
        $genre: String,
        $author: String
        )
    {
    allBooks (
        genre: $genre,
        author: $author
        )
    {
        id
        title
        author {
            name
            born
            bookCount
        }
        published
        genres
    }
}
`


export const ADD_BOOK = gql`
    mutation addBook (
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    )
    {
        addBook (
            title: $title
            author: $author
            published: $published
            genres: $genres
        )
        {
            id
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor (
        $name: String!
        $setBornTo: Int!
    )
    {
        editAuthor (
            name: $name
            setBornTo: $setBornTo
        )
        {
            name
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER = gql`
  query {
      user {
          id
          username
          favouriteGenre
      }
  }
`
export const BOOK_ADDED = gql`
  subscription {
      bookAdded {
        id
        title
        author {
            name
            born
            bookCount
        }
        published
        genres
      }
  }
`