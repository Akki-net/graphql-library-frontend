import { useState, useEffect, createContext } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const ErrorContext = createContext([{}, () => { }])

const App = () => {
  const [page, setPage] = useState('authors')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      console.log(JSON.parse(window.localStorage.getItem('loggedInUser')).username)
      setUserName(JSON.parse(window.localStorage.getItem('loggedInUser')).username)
    }
  }, [isLoggedIn])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logOut = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUserName('')
    setIsLoggedIn(false)
  }

  return (
    <div>
      {!window.localStorage.getItem('loggedInUser') && <Login loginStat={setIsLoggedIn} />}
      {window.localStorage.getItem('loggedInUser') && <div>
        <h3>Hello, {userName} &nbsp;<button onClick={logOut}>Log Out</button> </h3>
        <Notify errorMessage={errorMessage} />
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
        </div>

        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
          <Authors show={page === 'authors'} />
        </ErrorContext.Provider>

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} setError={notify} />
      </div>}

    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default App
export { ErrorContext }
