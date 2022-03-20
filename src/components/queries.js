import { gql } from "@apollo/client"

export const GET_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`

export const GET_BOOKS = gql`
    query{
        allBooks{
            title
            published
            author
        }
    }
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
     title
     author 
    }
  }
`