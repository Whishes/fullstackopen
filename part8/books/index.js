const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
require('dotenv').config()

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const pubsub = new PubSub()
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
  mongoose.set("debug", true)

const typeDefs = gql`
    type Subscription {
      bookAdded: Book!
    }

    type User {
      username: String!
      favouriteGenre: String!
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
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      user: User
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
            favouriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
      authorCount: () => Author.collection.countDocuments(),
      bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author")
      }
      let books = await Book.find({}).populate("author")
        // if only Author
      if (args.author && !args.genre) {
          books = books.filter(book => book.author === args.author)
      }
      // if only genre
      if (args.genre && !args.author) {
        books = books.filter(book => book.genres.findIndex((genre) => genre == args.genre) !== -1
        )
      }
      return books
    },
    
      allAuthors: async (root, args) => {
          return await Author.find({})
    },
      user: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const BookCount = await Book.find({ author: root.id }).countDocuments()
      return BookCount
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
      let book = new Book({
        ...args,
        author: newAuthor,
        id: uuid()
      })
      
      // saves new book to database or throws error if not possible
      try {
        await book.save()
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      pubsub.publish("BOOK_ADDED", {bookAdded: book})

      return book
    },
    
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }  

      const author = await Author.findOneAndUpdate({ name: args.name }, {born: args.setBornTo})
      if (!author) {
        return null
      }
      
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

      if ( !user || args.password !== 'test' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(
        ["BOOK_ADDED"]
      )
    }
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

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})