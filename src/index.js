import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HttpLink, InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('loggedInUser') ? JSON.parse(window.localStorage.getItem('loggedInUser')).token : null

    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'))
