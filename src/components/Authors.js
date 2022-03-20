import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../components/queries'

const Authors = (props) => {
  const fetchAuth = useQuery(GET_AUTHORS)

  if (!props.show) {
    return null
  }

  if(fetchAuth.loading){
    return <div>...loading</div>
  }

  const authors = [...fetchAuth.data.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a,i) => (
            <tr key={`${a.name}i`}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
