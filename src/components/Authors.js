import React, {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../components/queries'
import UpdateAuthor from './UpdateAuthor'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const fetchAuth = useQuery(GET_AUTHORS)

  useEffect(() => {
    setAuthors(fetchAuth.data.allAuthors)
  }, [props.show, fetchAuth.data])

  if (!props.show) {
    return null
  }

  if (fetchAuth.loading) {
    return <div>...loading</div>
  }

  // const authors = [...fetchAuth.data.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a, i) => (
            <tr key={`${a.name}i`}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateAuthor />
    </div>
  )
}

export default Authors
