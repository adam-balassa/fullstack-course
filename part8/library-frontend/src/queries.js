import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks ($genre: String){
    allBooks (genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres,
    ) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation setBirthYear($name: String!, $year: Int!) {
    editAuthor (name: $name, setBornTo: $year) {
      name
      born
      id
    }
  }
`

const LOGIN = gql`
  mutation login($userName: String!, $password: String!) {
    login (username: $userName, password: $password) {
      value
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, ME, LOGIN, BOOK_ADDED }