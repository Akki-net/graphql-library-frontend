import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from './components/queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const fetchAuth = useQuery(GET_AUTHORS)
  if(fetchAuth.loading){
    return <div>loading...</div>
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={fetchAuth.data.allAuthors}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
