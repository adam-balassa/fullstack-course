const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const JWT_SECRET = 'SUPERSECRETSUPERKEY'

mongoose.connect('mongodb+srv://fullstack:ygGfYSDojyR83sYE@fullstack-cluster.ol9sn.mongodb.net/book-app?retryWrites=true&w=majority')
  .then(() => { console.log('connected to MongoDB') })
  .catch((error) => { console.log('error connection to MongoDB:', error.message) })

const typeDefs = gql`
  type Book {  
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }


  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book!

    editAuthor(
      name: String!,
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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, { author, genre }) => {
      const query = {}
      if (genre) query.genres = { $elemMatch: { $eq: genre } }
      return await Book.find(query)
    },
    allAuthors: async () => await Author.find({}),
    me: (_, __, context) => context.currentUser
  },
  Mutation: {
    addBook: async (_, newBook, { currentUser }) => {
      try {
        if (!currentUser) throw new Error('Unauthorized')
        const author = await Author.findOne({ name: newBook.author })
        if (!author) throw new Error('Author not found')
        return await new Book({ genres: [], ...newBook, author }).save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: newBook })
      }
    },
    editAuthor: async (_, { name, setBornTo: born }, { currentUser }) => {
      try {
        if (!currentUser) throw new Error('Unauthorized')
        return await Author.findOneAndUpdate({ name }, { born }, { new: true })
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: { name, born } })
      }
    },
    createUser: async (_, { username, favoriteGenre }) => {
      try {
        return await new User({ username, favoriteGenre }).save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: { username, favoriteGenre } })
      }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username })    
        if ( !user || password !== 'secret' ) throw new Error('Invalid credentials')
        return { 
          value: jwt.sign({ username, id: user.id }, JWT_SECRET) 
        }
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: { username, password } })
      }
    }
  },
  Author: {
    bookCount: async root => await Book.count({ author: root.id })
  }, Book: {
    author: async root => (await root.populate('author')).author
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})