import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../components/queries'

const Books = (props) => {
  const fetchBook = useQuery(GET_BOOKS)

  if (!props.show) {
    return null
  }

  if(fetchBook.loading){
    return <div>...loading</div>
  }

  const books = [...fetchBook.data.allBooks]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
