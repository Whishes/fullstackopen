const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }

    type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

    type Mutation {
        addBook (
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book,
        editAuthor (
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
      }
    }
`

const resolvers = {
  Query: {
      authorCount: () => Author.collection.countDocuments(),
      bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
        // if only Author
      if (args.author && !args.genre) {
            const books =  args.author 
            ? books.filter(book => book.author === args.author)
            : books
        return filter
      }
      // if only genre
        if (args.genre && !args.author) {
            const books = args.genre
            ? books.filter(book => book.genres.includes(args.genre))
            : books

            return books
      }
      // if both
        if (args.genre && args.author) {
            const books = books
            ? books.filter(book => book.author === args. author && book.genres.includes(args.genre))
            : books

            return books
        }

        return books   
      },
      allAuthors: async (root, args) => {
          return await Author.find({})
    },
      me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      const booksCounted = books.filter(book => book.author === root.name).length
      return booksCounted
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      // if the input title is found, reject title with error
          if (await Book.findOne({title: args.title})) {
              throw new UserInputError("Title Must be Unique", {
                  invalidArgs: args.title,
              })
      }
      // if no author found, add a new author
          if (!(await Author.findOne({name: args.author}))) {
            let newAuthor = new Author({ name: args.author })
            try {
              await newAuthor.save()
            } catch {
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }
      }
      // add new book
      const newAuthor = await Author.findOne({name: args.author})
      const book = new Book({
        ...args,
        author: newAuthor 
      })
      
      // saves new book to database or throws error if not possible
      try {
        await book.save()
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }  

        if (!(authors.find(a => a.name === args.name))) {
          throw new UserInputError("Needs a name", {
            invalidArgs: args
          })
      }
      
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      
      try {
        await author.save()
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})