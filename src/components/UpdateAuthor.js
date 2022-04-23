import React, { useState, useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { SET_BIRTH, GET_AUTHORS } from './queries'
import { ErrorContext } from '../App'

const UpdateAuthor = () => {
    const [errorMessage, setErrorMessage] = useContext(ErrorContext)
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const fetchAuth = useQuery(GET_AUTHORS)
    const [setAuthorBirth] = useMutation(SET_BIRTH, {
        refetchQueries: [{ query: GET_AUTHORS }],
        onError: error => {
            setErrorMessage(error.graphQLErrors[0].message)
        }
    })

    React.useMemo(() => {
        setName(fetchAuth.data.allAuthors[0].name)
    }, [fetchAuth.data])

    if (fetchAuth.loading) {
        return <div>...loading</div>
    }


    const submit = event => {
        event.preventDefault()
        setAuthorBirth({ variables: { name, setBornTo: Number(birth) } })

        setName('')
        setBirth('')
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                    {fetchAuth.data.allAuthors.map((author, i) => <option key={i} value={author.name}>
                        {author.name}
                    </option>)}
                </select><br />
                {/* <input value={name} onChange={({ target }) => setName(target.value)} /><br /> */}
                born<input value={birth} maxLength="4" onChange={({ target }) => !isNaN(target.value) && setBirth(target.value)} /><br />
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default UpdateAuthor